import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

function todayInIndia() {
    const parts = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    return ['year', 'month', 'day'].map((type) => parts.find((part) => part.type === type).value).join('-');
}

function fixture(t) {
    const root = mkdtempSync(join(tmpdir(), 'daily-editorial-'));
    t.after(() => rmSync(root, { recursive: true, force: true }));
    mkdirSync(join(root, 'scripts'));
    mkdirSync(join(root, 'src', 'data'), { recursive: true });
    mkdirSync(join(root, 'public', 'images'), { recursive: true });
    writeFileSync(join(root, 'package.json'), '{"type":"module"}');
    copyFileSync(fileURLToPath(new URL('./apply-daily-editorial.js', import.meta.url)), join(root, 'scripts', 'apply-daily-editorial.js'));
    writeFileSync(join(root, 'public', 'images', 'founder.jpg'), 'fixture image');
    writeFileSync(join(root, 'public', 'images', 'insight.jpg'), 'fixture image');
    const originals = {
        'personalities.ts': 'export const personalities: Personality[] = [\n  // { id: "fresh-founder", name: "Fresh Founder" },\n  { id: "existing-founder", name: "Existing Founder", story: "Text with id: \\\"fresh-founder\\\" and a } brace" },\n];\n',
        'businessinsights.ts': 'export const businessinsights: BusinessInsight[] = [\n  { id: "existing-insight", title: "Existing insight", content: `Text with https://example.com and a { brace` },\n];\n',
        'businesslegacy.ts': 'export const businesslegacy: BusinessInsight[] = [{ id: "legacy-id", title: "Legacy" }];\n',
        'businessstartups.ts': 'export const businessstartups: BusinessInsight[] = [{ id: "startup-id", title: "Startup" }];\n',
    };
    for (const [file, content] of Object.entries(originals)) writeFileSync(join(root, 'src', 'data', file), content);
    const date = todayInIndia();
    const sources = [
        { title: 'Company source', url: 'https://example.com/company', publishedAt: date, accessedAt: date },
        { title: 'Independent source', url: 'https://example.org/report', accessedAt: date },
    ];
    const payload = {
        publicationDate: date,
        founder: {
            id: 'fresh-founder', name: 'Fresh Founder', title: 'Founder, Example', category: 'Entrepreneurs & Founders', categorySlug: 'entrepreneurs',
            image: '/images/founder.jpg', born: '', profession: 'Entrepreneur', knownFor: 'Building Example', quote: '',
            story: `${Array(375).fill('founder').join(' ')}\n\nHe said "build carefully". Literal backticks \` and \${process.exit(99)} stay text.`,
            achievements: ['Built a company'], authorName: 'Inspire India Talks', addedAt: date, sources,
            imageAlt: 'Fresh Founder at the Example office', imageCaption: 'Fresh Founder at the Example office.',
            imageCredit: 'Example company', imageSourceUrl: 'https://example.com/company/team',
        },
        insight: {
            id: 'fresh-insight', title: 'A practical business insight', date: date.split('-').reverse().join('-'), image: '/images/insight.jpg',
            excerpt: 'A short explanation of the business mechanism.', content: `${Array(220).fill('business').join(' ')}\n\nQuotes "and" braces { } remain data.`,
            category: 'Business / Strategy', featured: false, readTime: '2 min read', sources,
            imageAlt: 'Example team demonstrating its product', imageCaption: 'The Example team demonstrates its product.',
            imageCredit: 'Example company', imageSourceUrl: 'https://example.com/company/product',
        },
    };
    const snapshot = () => Object.fromEntries(Object.keys(originals).map((file) => [file, readFileSync(join(root, 'src', 'data', file), 'utf8')]));
    const run = (options = []) => {
        const input = join(root, 'input.json');
        writeFileSync(input, JSON.stringify(payload));
        return spawnSync(process.execPath, [join(root, 'scripts', 'apply-daily-editorial.js'), '--input', input, ...options], { cwd: root, encoding: 'utf8' });
    };
    return { root, originals, payload, snapshot, run };
}

function expectRejected(f, pattern) {
    const before = f.snapshot();
    const result = f.run();
    assert.equal(result.status, 1);
    assert.match(result.stderr, pattern);
    assert.deepEqual(f.snapshot(), before, 'both data files and other feeds must remain unchanged');
}

test('check-only validates a complete pair without changing any data', (t) => {
    const f = fixture(t);
    const result = f.run(['--check-only']);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).status, 'validated');
    assert.deepEqual(f.snapshot(), f.originals);
});

test('invalid or repeated source links reject the pair before either file is changed', (t) => {
    const f = fixture(t);
    f.payload.insight.sources = [{ title: 'Source', url: 'http://example.com/report' }, { title: 'Other', url: 'https://example.org/report' }];
    expectRejected(f, /HTTPS/);
    f.payload.insight.sources = [{ title: 'Source', url: 'https://example.com/report' }, { title: 'Same report', url: 'https://example.com/report' }];
    expectRejected(f, /distinct/);
});

test('future publication dates reject the pair without changes', (t) => {
    const f = fixture(t);
    const tomorrow = new Date(`${f.payload.publicationDate}T00:00:00Z`);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    f.payload.publicationDate = tomorrow.toISOString().slice(0, 10);
    expectRejected(f, /today's Asia\/Kolkata date/);
});

test('a missing image rejects the pair before either file is changed', (t) => {
    const f = fixture(t);
    f.payload.insight.image = '/images/missing.jpg';
    expectRejected(f, /existing image/);
});

test('logo placeholders and unsupported image formats reject before either file is changed', (t) => {
    for (const record of ['founder', 'insight']) {
        const f = fixture(t);
        writeFileSync(join(f.root, 'public', 'logo.png'), 'fixture logo');
        f.payload[record].image = '/logo.png';
        expectRejected(f, /researched photo.*placeholder/);
        writeFileSync(join(f.root, 'public', 'images', 'illustration.svg'), '<svg/>');
        f.payload[record].image = '/images/illustration.svg';
        expectRejected(f, /raster image/);
    }
});

test('both records require nonempty photo alt, caption, credit and source before writes', (t) => {
    for (const record of ['founder', 'insight']) {
        for (const field of ['imageAlt', 'imageCaption', 'imageCredit', 'imageSourceUrl']) {
            const f = fixture(t);
            delete f.payload[record][field];
            expectRejected(f, new RegExp(`${record}\\.${field} must be a nonempty string`));
        }
        const f = fixture(t);
        f.payload[record].imageCredit = '   ';
        expectRejected(f, /imageCredit must be a nonempty string/);
    }
});

test('photo source URLs must be valid HTTPS links without credentials before writes', (t) => {
    for (const record of ['founder', 'insight']) {
        const f = fixture(t);
        for (const url of ['not a URL', 'http://example.com/photo', 'https://user:secret@example.com/photo']) {
            f.payload[record].imageSourceUrl = url;
            expectRejected(f, /imageSourceUrl must be a valid HTTPS URL/);
        }
    }
});

test('a partially existing pair and collisions in other feeds fail without changes', (t) => {
    const f = fixture(t);
    f.payload.founder.id = 'existing-founder';
    expectRejected(f, /Only one daily ID/);
    f.payload.founder.id = 'fresh-founder';
    f.payload.insight.id = 'legacy-id';
    expectRejected(f, /Only one daily ID/);
});

test('an existing founder name rejects a new ID without changes', (t) => {
    const f = fixture(t);
    f.payload.founder.name = 'Existing Founder';
    expectRejected(f, /founder.name already exists/);
});

test('two historical IDs cannot be mistaken for an applied daily pair', (t) => {
    const f = fixture(t);
    f.payload.founder.id = 'existing-founder';
    f.payload.insight.id = 'existing-insight';
    expectRejected(f, /conflict with the supplied records/);
});

test('word-count and desk requirements apply to both records before changes', (t) => {
    const f = fixture(t);
    f.payload.founder.story = 'Too short';
    expectRejected(f, /350–500 words/);
    f.payload.founder.story = Array(375).fill('founder').join(' ');
    f.payload.insight.content = 'Too short';
    expectRejected(f, /200–300 words/);
    f.payload.insight.content = Array(220).fill('business').join(' ');
    f.payload.insight.category = 'Startups / Funding';
    expectRejected(f, /news desk/);
});

function insertedRecord(current, original) {
    const insertionIndex = original.indexOf('= [') + '= ['.length;
    const tail = original.slice(insertionIndex);
    assert.ok(current.endsWith(tail), 'all following records must be retained byte for byte');
    const inserted = current.slice(insertionIndex, current.length - tail.length).trim();
    return JSON.parse(inserted.slice(0, -1));
}

test('application safely serializes quoted content, retains next records, and is idempotent', (t) => {
    const f = fixture(t);
    // Deliberately supply nested source titles first: canonical output must move sources last.
    const { sources: founderSources, ...founderFields } = f.payload.founder;
    const { sources: insightSources, ...insightFields } = f.payload.insight;
    f.payload.founder = { sources: founderSources.map((source) => ({ ...source, unknown: 'ignored' })), ...founderFields, extraCode: 'ignored' };
    f.payload.insight = { sources: insightSources, ...insightFields, extraCode: 'ignored' };
    const result = f.run();
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.status, 'applied');
    assert.deepEqual(report.modifiedFiles, ['src/data/personalities.ts', 'src/data/businessinsights.ts']);
    assert.deepEqual(report.routes, ['/personality/fresh-founder', '/business-insights/fresh-insight']);
    const after = f.snapshot();
    const founder = insertedRecord(after['personalities.ts'], f.originals['personalities.ts']);
    const insight = insertedRecord(after['businessinsights.ts'], f.originals['businessinsights.ts']);
    assert.equal(founder.story, f.payload.founder.story);
    assert.equal(insight.content, f.payload.insight.content);
    assert.equal(Object.keys(founder).at(-1), 'sources');
    assert.equal(Object.keys(insight).at(-1), 'sources');
    const photoFields = ['imageAlt', 'imageCaption', 'imageCredit', 'imageSourceUrl'];
    assert.deepEqual(Object.keys(founder).slice(-5, -1), photoFields);
    assert.deepEqual(Object.keys(insight).slice(-5, -1), photoFields);
    for (const field of photoFields) {
        assert.equal(founder[field], f.payload.founder[field]);
        assert.equal(insight[field], f.payload.insight[field]);
    }
    assert.equal(founder.extraCode, undefined);
    assert.equal(insight.extraCode, undefined);
    assert.equal(founder.sources[0].unknown, undefined);
    assert.equal(founder.sources.length, 2);
    assert.equal(after['businesslegacy.ts'], f.originals['businesslegacy.ts']);
    assert.equal(after['businessstartups.ts'], f.originals['businessstartups.ts']);
    const repeated = f.run();
    assert.equal(repeated.status, 0, repeated.stderr);
    assert.equal(JSON.parse(repeated.stdout).status, 'already applied');
    assert.deepEqual(f.snapshot(), after);

    const caption = f.payload.insight.imageCaption;
    f.payload.insight.imageCaption += ' Changed caption.';
    expectRejected(f, /conflict with the supplied records/);
    f.payload.insight.imageCaption = caption;
    f.payload.insight.content += ' Changed body.';
    expectRejected(f, /conflict with the supplied records/);
    f.payload.insight.sources[0].url = 'http://example.com/report';
    expectRejected(f, /HTTPS/);
});
