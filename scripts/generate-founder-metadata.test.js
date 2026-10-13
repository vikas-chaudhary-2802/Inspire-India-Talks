import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// The generators read TypeScript object literals with unquoted property names.
const toObjectLiteral = (value) => JSON.stringify(value).replace(/"([A-Za-z_]\w*)":/g, '$1:');

const founders = [
  {
    id: 'first-founder',
    name: 'Builder One',
    title: 'Founder',
    image: '/first.jpg',
    knownFor: 'Building useful things',
    quote: '',
    story: 'Escaped "quotation" and apostrophe \' plus unmatched { and https://site.test/foo }.',
    addedAt: '2026-10-14',
    sources: [{
      title: 'Interview with {unmatched opening',
      url: 'https://example.com/a?x={keep}',
      accessedAt: '2026-10-13',
    }],
  },
  {
    id: 'second-founder',
    name: 'Builder Two',
    title: 'CEO',
    image: '/second.jpg',
    knownFor: 'Operating useful things',
    quote: '',
    story: 'A second story with an unmatched } and a URL https://site.test/a.',
    addedAt: '2026-10-13',
    sources: [{
      title: 'Closing brace } in citation',
      url: 'https://example.com/b#anchor',
    }],
  },
];

// Match the publication helper's JSON.stringify output, including escaped values.
const queuedFounder = {
  id: 'json-founder',
  name: 'JSON Builder',
  title: 'Co-founder, "Quoted" Ventures',
  image: '/images/founder-stories/json-founder.jpg',
  knownFor: 'Two lines\nwith a literal \\n marker',
  quote: 'He said "build", then stopped.',
  addedAt: '2026-10-14',
  sources: [{ title: 'A nested source title', url: 'https://example.com/queued' }],
};

const queuedInsight = {
  id: 'json-insight',
  date: '14-10-2026',
  title: 'A queued insight',
  sources: [{ title: 'A report', url: 'https://example.com/report' }],
};

function withFixture(run) {
  const fixture = mkdtempSync(join(tmpdir(), 'founder-metadata-regression-'));
  try {
    mkdirSync(join(fixture, 'scripts'));
    mkdirSync(join(fixture, 'src', 'data'), { recursive: true });
    mkdirSync(join(fixture, 'dist'));
    writeFileSync(join(fixture, 'package.json'), '{"type":"module"}');
    for (const file of ['generate-og-data.js', 'generate-sitemap.js']) {
      copyFileSync(join(root, 'scripts', file), join(fixture, 'scripts', file));
    }

    const comments = '// { id: "commented-template", name: "Skipped" }\n/* } { id: "block-template" } */\n';
    writeFileSync(
      join(fixture, 'src', 'data', 'personalities.ts'),
      'export const categories = [{ slug: "entrepreneurs" }];\n' +
        'export const personalities: Personality[] = [\n' + comments +
        founders.map(toObjectLiteral).join(',\n') + ',\n' +
        JSON.stringify(queuedFounder).replace('"id":"json-founder"', '"id":"json\\u002dfounder"') + '\n];\n',
    );
    writeFileSync(
      join(fixture, 'src', 'data', 'businessinsights.ts'),
      'export const businessinsights: BusinessInsight[] = [' +
        '{ id: "daily-insight", date: "14-10-2026", content: `A body containing } and escaped \\` quote https://body.test/a {`, ' +
        'sources: [{title: "Report {", url: "https://example.com/insight"}] },\n' +
        JSON.stringify(queuedInsight) + '\n];\n',
    );
    writeFileSync(
      join(fixture, 'src', 'data', 'events.ts'),
      "export const events: Event[] = [{slug: \"event-one\", title: \"Event {\"}, {'slug': 'single\\x2dquoted\\u002devent'}];\n",
    );
    run(fixture);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
}

test('founder OG keeps inline citations, escaped quotes and quoted braces in their story blocks', () => {
  withFixture((fixture) => {
    execFileSync(process.execPath, [join(fixture, 'scripts', 'generate-og-data.js')]);
    const result = JSON.parse(readFileSync(join(fixture, 'dist', 'og-data.json'), 'utf8'));
    assert.deepEqual(result.map((item) => item.id), ['first-founder', 'second-founder', 'json-founder']);
    assert.deepEqual(result.map((item) => item.name), ['Builder One', 'Builder Two', 'JSON Builder']);
    assert.deepEqual(result.map((item) => item.image), ['/first.jpg', '/second.jpg', queuedFounder.image]);
    assert.equal(result[2].title, queuedFounder.title);
    assert.equal(result[2].knownFor, queuedFounder.knownFor);
    assert.equal(result[2].quote, queuedFounder.quote);
  });
});

test('sitemap retains founders and articles containing inline citation URLs and quoted braces', () => {
  withFixture((fixture) => {
    execFileSync(process.execPath, [join(fixture, 'scripts', 'generate-sitemap.js')]);
    const result = readFileSync(join(fixture, 'dist', 'sitemap.xml'), 'utf8');
    for (const path of [
      '/personality/first-founder',
      '/personality/second-founder',
      '/personality/json-founder',
      '/business-insights/daily-insight',
      '/business-insights/json-insight',
      '/events/event-one',
      '/events/single-quoted-event',
    ]) {
      assert.ok(result.includes('https://www.inspireindiatalks.com' + path), path);
    }
    assert.match(result, /<loc>https:\/\/www\.inspireindiatalks\.com\/personality\/first-founder<\/loc>\s*<lastmod>2026-10-14<\/lastmod>/);
    assert.ok(!result.includes('commented-template'));
    assert.ok(!result.includes('block-template'));
  });
});
