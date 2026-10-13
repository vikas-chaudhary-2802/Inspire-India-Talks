/** Validate and prepend a daily founder/insight pair. This never deploys or commits. */
import { existsSync, readFileSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';

const ROOT = resolve(dirname(decodeURIComponent(new URL(import.meta.url).pathname)), '..');
const FILES = [
    { file: 'src/data/personalities.ts', exportName: 'personalities', type: 'Personality' },
    { file: 'src/data/businessinsights.ts', exportName: 'businessinsights', type: 'BusinessInsight' },
    { file: 'src/data/businesslegacy.ts', exportName: 'businesslegacy', type: 'BusinessInsight' },
    { file: 'src/data/businessstartups.ts', exportName: 'businessstartups', type: 'BusinessInsight' },
];

function requireObject(value, label) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`);
}

function requireString(value, label, allowEmpty = false) {
    if (typeof value !== 'string' || (!allowEmpty && !value.trim())) throw new Error(`${label} must be ${allowEmpty ? 'a string' : 'a nonempty string'}`);
    return value;
}

function requireId(value, label) {
    requireString(value, label);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) throw new Error(`${label} must be a lowercase kebab-case id`);
}

function requireIsoDate(value, label) {
    requireString(value, label);
    const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00Z`) : null;
    if (!date || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new Error(`${label} must be a valid YYYY-MM-DD date`);
}

function todayInIndia() {
    const parts = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
    const value = (type) => parts.find((part) => part.type === type).value;
    return `${value('year')}-${value('month')}-${value('day')}`;
}

function skipString(text, start) {
    const quote = text[start];
    for (let i = start + 1; i < text.length; i++) {
        if (text[i] === '\\') i++;
        else if (text[i] === quote) return i;
    }
    throw new Error('Existing editorial data contains an unterminated string');
}

function skipComment(text, start) {
    if (text[start] !== '/') return start;
    if (text[start + 1] === '/') {
        const end = text.indexOf('\n', start + 2);
        return end === -1 ? text.length : end;
    }
    if (text[start + 1] === '*') {
        const end = text.indexOf('*/', start + 2);
        if (end === -1) throw new Error('Existing editorial data contains an unterminated comment');
        return end + 1;
    }
    return start;
}

// Inspect literals as text, never execute the TypeScript or supplied content.
function readArray(source, descriptor) {
    const marker = new RegExp(`export\\s+const\\s+${descriptor.exportName}\\s*:\\s*${descriptor.type}\\[\\]\\s*=\\s*\\[`);
    const match = marker.exec(source);
    if (!match) throw new Error(`Cannot find ${descriptor.exportName} array in ${descriptor.file}`);
    const insertionIndex = match.index + match[0].length;
    const records = [];
    let brackets = 1;
    let braces = 0;
    let recordStart = -1;
    for (let i = insertionIndex; i < source.length; i++) {
        const char = source[i];
        if (char === '"' || char === "'" || char === '`') { i = skipString(source, i); continue; }
        const commentEnd = skipComment(source, i);
        if (commentEnd !== i) { i = commentEnd; continue; }
        if (char === '[') brackets++;
        else if (char === ']') {
            brackets--;
            if (brackets === 0) {
                if (braces !== 0) throw new Error(`Unbalanced records in ${descriptor.file}`);
                return { insertionIndex, records };
            }
        } else if (char === '{') {
            if (braces === 0) recordStart = i;
            braces++;
        } else if (char === '}') {
            braces--;
            if (braces < 0) throw new Error(`Unbalanced records in ${descriptor.file}`);
            if (braces === 0 && recordStart !== -1) {
                records.push(source.slice(recordStart, i + 1));
                recordStart = -1;
            }
        }
    }
    throw new Error(`Unterminated ${descriptor.exportName} array in ${descriptor.file}`);
}

function decodeLiteral(raw) {
    if (raw[0] === '"') return JSON.parse(raw);
    const escapes = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', '0': '\0' };
    return raw.slice(1, -1).replace(/\\(?:u\{([\da-fA-F]+)\}|u([\da-fA-F]{4})|x([\da-fA-F]{2})|([\s\S]))/g, (_, codePoint, unicode, hex, escaped) => {
        if (codePoint || unicode || hex) return String.fromCodePoint(parseInt(codePoint || unicode || hex, 16));
        return escapes[escaped] ?? escaped;
    });
}

function readStringField(record, field) {
    let braces = 0;
    let brackets = 0;
    for (let i = 0; i < record.length; i++) {
        const commentEnd = skipComment(record, i);
        if (commentEnd !== i) { i = commentEnd; continue; }
        const char = record[i];
        let key;
        let end = i;
        if (char === '"' || char === "'" || char === '`') {
            end = skipString(record, i);
            if (braces === 1 && brackets === 0) key = decodeLiteral(record.slice(i, end + 1));
            i = end;
        } else if (braces === 1 && brackets === 0 && /[A-Za-z_$]/.test(char)) {
            const match = /^[A-Za-z_$][\w$]*/.exec(record.slice(i));
            key = match[0];
            end = i + key.length - 1;
            i = end;
        } else {
            if (char === '{') braces++;
            else if (char === '}') braces--;
            else if (char === '[') brackets++;
            else if (char === ']') brackets--;
        }
        if (key === field) {
            let next = end + 1;
            while (/\s/.test(record[next] ?? '')) next++;
            if (record[next] !== ':') continue;
            next++;
            while (/\s/.test(record[next] ?? '')) next++;
            if (!['"', "'", '`'].includes(record[next])) return undefined;
            return decodeLiteral(record.slice(next, skipString(record, next) + 1));
        }
    }
    return undefined;
}

function sourcesFor(value, label) {
    if (!Array.isArray(value) || value.length < 2) throw new Error(`${label} requires at least two titled HTTPS source links`);
    const unique = new Set();
    const sources = value.map((source, index) => {
        const item = `${label}[${index}]`;
        requireObject(source, item);
        requireString(source.title, `${item}.title`);
        requireString(source.url, `${item}.url`);
        let url;
        try { url = new URL(source.url); } catch { throw new Error(`${item}.url must be a valid HTTPS URL`); }
        if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) throw new Error(`${item}.url must be a valid HTTPS URL without credentials`);
        unique.add(url.href);
        const accepted = { title: source.title, url: source.url };
        for (const key of ['publishedAt', 'accessedAt']) {
            if (source[key] !== undefined) {
                requireIsoDate(source[key], `${item}.${key}`);
                accepted[key] = source[key];
            }
        }
        return accepted;
    });
    if (unique.size < 2) throw new Error(`${label} requires at least two distinct HTTPS source links`);
    return sources;
}

function requireImage(value, label) {
    requireString(value, label);
    if (!value.startsWith('/') || value.startsWith('//') || /[\\?#\0]/.test(value) || value.split('/').includes('..')) throw new Error(`${label} must be a local path under public/`);
    const publicRoot = realpathSync(resolve(ROOT, 'public'));
    const imagePath = resolve(publicRoot, `.${value}`);
    if (!existsSync(imagePath) || !statSync(imagePath).isFile()) throw new Error(`${label} does not name an existing image under public/: ${value}`);
    const imageRelative = relative(publicRoot, realpathSync(imagePath));
    if (imageRelative === '..' || imageRelative.startsWith(`..${sep}`) || imageRelative.startsWith(sep)) throw new Error(`${label} must remain inside public/`);
}

function requireWordCount(value, label, min, max) {
    const count = value.trim().split(/\s+/).length;
    if (count < min || count > max) throw new Error(`${label} must contain ${min}–${max} words (received ${count})`);
}

function acceptFounder(input, date) {
    const accepted = {};
    for (const key of ['id', 'name', 'title', 'category', 'categorySlug', 'image', 'born', 'profession', 'knownFor', 'quote', 'story']) {
        accepted[key] = requireString(input[key], `founder.${key}`, key === 'born' || key === 'quote');
    }
    if (accepted.categorySlug !== 'entrepreneurs' || accepted.category !== 'Entrepreneurs & Founders') throw new Error('founder must use the entrepreneurs category (Entrepreneurs & Founders)');
    if (!Array.isArray(input.achievements) || input.achievements.length === 0) throw new Error('founder.achievements must be a nonempty string array');
    accepted.achievements = input.achievements.map((value, index) => requireString(value, `founder.achievements[${index}]`));
    for (const key of ['authorName', 'authorLinkedin']) {
        if (input[key] !== undefined) accepted[key] = requireString(input[key], `founder.${key}`);
    }
    if (input.addedAt !== date) throw new Error('founder.addedAt must equal publicationDate');
    accepted.addedAt = input.addedAt;
    requireImage(accepted.image, 'founder.image');
    requireWordCount(accepted.story, 'founder.story', 350, 500);
    accepted.sources = sourcesFor(input.sources, 'founder.sources');
    return accepted;
}

function acceptInsight(input, date) {
    const accepted = {};
    for (const key of ['id', 'title', 'date', 'image', 'excerpt', 'content']) accepted[key] = requireString(input[key], `insight.${key}`);
    const [year, month, day] = date.split('-');
    if (accepted.date !== `${day}-${month}-${year}`) throw new Error('insight.date must equal publicationDate in DD-MM-YYYY format');
    accepted.category = requireString(input.category, 'insight.category');
    if (accepted.category === 'Business Legacy' || /^Startups/i.test(accepted.category)) throw new Error('insight.category must belong to the Business Insights news desk');
    if (input.featured !== undefined) {
        if (typeof input.featured !== 'boolean') throw new Error('insight.featured must be a boolean');
        accepted.featured = input.featured;
    }
    if (input.readTime !== undefined) accepted.readTime = requireString(input.readTime, 'insight.readTime');
    requireImage(accepted.image, 'insight.image');
    requireWordCount(accepted.content, 'insight.content', 200, 300);
    accepted.sources = sourcesFor(input.sources, 'insight.sources');
    return accepted;
}

function prepend(source, insertionIndex, record) {
    const serialized = JSON.stringify(record, null, 2).split('\n').map((line) => `  ${line}`).join('\n');
    return `${source.slice(0, insertionIndex)}\n${serialized},${source.slice(insertionIndex)}`;
}

function matchesAcceptedRecord(existing, accepted) {
    try {
        // Applied records are canonical JSON literals. Compare their full accepted
        // contents, including publication dates and citations, before claiming a retry.
        return JSON.stringify(JSON.parse(existing.record)) === JSON.stringify(accepted);
    } catch {
        return false;
    }
}

function main() {
    let inputPath;
    let checkOnly = false;
    for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i];
        if (arg === '--input' && !inputPath && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) inputPath = process.argv[++i];
        else if (arg === '--check-only' && !checkOnly) checkOnly = true;
        else throw new Error('Usage: node scripts/apply-daily-editorial.js --input <JSON file> [--check-only]');
    }
    if (!inputPath) throw new Error('Usage: node scripts/apply-daily-editorial.js --input <JSON file> [--check-only]');
    const input = JSON.parse(readFileSync(resolve(inputPath), 'utf8'));
    requireObject(input, 'input');
    requireObject(input.founder, 'founder');
    requireObject(input.insight, 'insight');
    requireIsoDate(input.publicationDate, 'publicationDate');
    const today = todayInIndia();
    if (input.publicationDate !== today) throw new Error(`publicationDate must be today's Asia/Kolkata date (${today})`);
    requireId(input.founder.id, 'founder.id');
    requireId(input.insight.id, 'insight.id');
    if (input.founder.id === input.insight.id) throw new Error('founder.id and insight.id must differ');
    const founder = acceptFounder(input.founder, input.publicationDate);
    const insight = acceptInsight(input.insight, input.publicationDate);

    const files = FILES.map((descriptor) => {
        const path = resolve(ROOT, descriptor.file);
        const source = readFileSync(path, 'utf8');
        return { ...descriptor, path, source, ...readArray(source, descriptor) };
    });
    const existing = files.flatMap((file) => file.records.map((record) => ({ file: file.file, record, id: readStringField(record, 'id'), name: readStringField(record, 'name') })));
    const founderMatches = existing.filter((record) => record.id === input.founder.id);
    const insightMatches = existing.filter((record) => record.id === input.insight.id);
    const output = {
        status: 'validated',
        publicationDate: input.publicationDate,
        ids: { founder: input.founder.id, insight: input.insight.id },
        modifiedFiles: [],
        routes: [`/personality/${input.founder.id}`, `/business-insights/${input.insight.id}`],
    };
    if (founderMatches.length && insightMatches.length) {
        if (founderMatches.length !== 1 || insightMatches.length !== 1 || founderMatches[0].file !== FILES[0].file || insightMatches[0].file !== FILES[1].file) throw new Error('Existing IDs collide outside their intended editorial records');
        if (!matchesAcceptedRecord(founderMatches[0], founder) || !matchesAcceptedRecord(insightMatches[0], insight)) throw new Error('Existing daily IDs conflict with the supplied records; no files changed');
        console.log(JSON.stringify({ ...output, status: 'already applied' }));
        return;
    }
    if (founderMatches.length || insightMatches.length) throw new Error('Only one daily ID already exists; reconcile the partial pair before applying');

    if (existing.some((record) => record.file === FILES[0].file && record.name?.trim() === founder.name.trim())) throw new Error(`founder.name already exists: ${founder.name}`);
    const updates = [
        { file: files[0], source: prepend(files[0].source, files[0].insertionIndex, founder) },
        { file: files[1], source: prepend(files[1].source, files[1].insertionIndex, insight) },
    ];
    if (!checkOnly) {
        const written = [];
        try {
            for (const update of updates) {
                written.push(update.file);
                writeFileSync(update.file.path, update.source, 'utf8');
            }
        } catch (error) {
            for (const file of written) writeFileSync(file.path, file.source, 'utf8');
            throw error;
        }
        output.status = 'applied';
        output.modifiedFiles = updates.map(({ file }) => file.file);
    }
    console.log(JSON.stringify(output));
}

try { main(); }
catch (error) { console.error(`Daily editorial: ${error.message}`); process.exitCode = 1; }
