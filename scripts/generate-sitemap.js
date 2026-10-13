/**
 * Post-build script: generates dist/sitemap.xml from the site's data files.
 *
 * Runs after `vite build` (see package.json). Reads the personalities, business
 * insights, events and category data straight from src/data/*.ts and emits a
 * sitemap covering every public URL. Because it regenerates on each build, the
 * sitemap never goes stale.
 *
 * NOTE: BASE_URL must match the canonical host the site actually serves on.
 * The live site redirects inspireindiatalks.com -> www.inspireindiatalks.com,
 * so the www host is used here. If you switch the primary domain, change this
 * one line.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const BASE_URL = 'https://www.inspireindiatalks.com';
const DATA = join(ROOT, 'src', 'data');
const distDir = join(ROOT, 'dist');
const outPath = join(distDir, 'sitemap.xml');

if (!existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Run "vite build" first.');
  process.exit(1);
}

/**
 * Splits the top-level `{ ... }` object blocks out of an array literal,
 * ignoring quoted text and comments. Nested source objects stay in their
 * containing story, and URL slashes are not mistaken for line comments.
 */
function extractObjectBlocks(arrayContent) {
  const blocks = [];
  let depth = 0;
  let blockStart = -1;
  let quote = null;
  let escaped = false;
  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];

    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }

    if (char === '/' && arrayContent[i + 1] === '/') {
      while (i < arrayContent.length && arrayContent[i] !== '\n') i++;
      continue;
    }
    if (char === '/' && arrayContent[i + 1] === '*') {
      i += 2;
      while (i < arrayContent.length && !(arrayContent[i] === '*' && arrayContent[i + 1] === '/')) i++;
      i++;
      continue;
    }

    if (char === '{') {
      if (depth === 0) blockStart = i;
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0 && blockStart !== -1) {
        blocks.push(arrayContent.substring(blockStart, i + 1));
        blockStart = -1;
      }
    }
  }
  return blocks;
}

function getArrayContent(file, exportName) {
  const content = readFileSync(join(DATA, file), 'utf8');
  const re = new RegExp(
    `export\\s+const\\s+${exportName}\\s*(?::[^=]+)?=\\s*\\[([\\s\\S]*?)\\];`
  );
  const m = content.match(re);
  if (!m) {
    console.warn(`⚠️  Could not find "${exportName}" in ${file}`);
    return '';
  }
  return m[1];
}

function extractField(block, fieldName) {
  const re = new RegExp(`(?:^|[{,])\\s*(?:"${fieldName}"|'${fieldName}'|${fieldName})\\s*:\\s*(["'\`])((?:\\\\[\\s\\S]|(?!\\1)[\\s\\S])*?)\\1(?=\\s*[,}])`);
  const match = block.match(re);
  if (!match) return '';

  // Queue records use JSON strings; existing TypeScript can also use JS escapes.
  if (match[1] === '"') {
    try { return JSON.parse(`"${match[2]}"`).trim(); } catch { /* Decode JS-only escapes below. */ }
  }
  const escapes = { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v', 0: '\0' };
  return match[2].replace(/\\(?:u([0-9a-fA-F]{4})|x([0-9a-fA-F]{2})|(\r\n|[\s\S]))/g, (_, unicode, hex, char) => {
    if (unicode || hex) return String.fromCharCode(parseInt(unicode || hex, 16));
    if (char === '\n' || char === '\r' || char === '\r\n') return '';
    return escapes[char] ?? char;
  }).trim();
}

// Convert "DD-MM-YYYY" -> "YYYY-MM-DD"; return '' if not parseable.
function toIsoDate(raw) {
  if (!raw) return '';
  let m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/); // already ISO
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/); // DD-MM-YYYY
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return '';
}

// ---- Collect URLs -----------------------------------------------------------

const urls = [];
const seen = new Set();
function add(path, lastmod) {
  const loc = `${BASE_URL}${path}`;
  if (seen.has(loc)) return;
  seen.add(loc);
  urls.push({ loc, lastmod: lastmod || '' });
}

// Static routes (from src/App.tsx)
const staticRoutes = [
  '/', '/about', '/inspiring-voices', '/host-event', '/contact',
  '/youth-spotlight', '/founders-talk', '/events', '/tree-volution',
  '/business-insights',
];
staticRoutes.forEach((r) => add(r));

// Categories -> /category/:slug
extractObjectBlocks(getArrayContent('personalities.ts', 'categories')).forEach((b) => {
  const slug = extractField(b, 'slug');
  if (slug) add(`/category/${slug}`);
});

// Personalities -> /personality/:id
let personCount = 0;
extractObjectBlocks(getArrayContent('personalities.ts', 'personalities')).forEach((b) => {
  const id = extractField(b, 'id');
  if (id) { add(`/personality/${id}`, toIsoDate(extractField(b, 'addedAt'))); personCount++; }
});

// Business insights -> /business-insights/:id
let insightCount = 0;
extractObjectBlocks(getArrayContent('businessinsights.ts', 'businessinsights')).forEach((b) => {
  const id = extractField(b, 'id');
  if (id) { add(`/business-insights/${id}`, toIsoDate(extractField(b, 'date'))); insightCount++; }
});

// Events -> /events/:slug
let eventCount = 0;
extractObjectBlocks(getArrayContent('events.ts', 'events')).forEach((b) => {
  const slug = extractField(b, 'slug');
  if (slug) { add(`/events/${slug}`); eventCount++; }
});

// ---- Write XML --------------------------------------------------------------

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const body = urls.map(({ loc, lastmod }) => {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
  return `  <url>\n${parts.join('\n')}\n  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(outPath, xml, 'utf8');
console.log(
  `✅ Generated sitemap.xml with ${urls.length} URLs ` +
  `(${personCount} personalities, ${insightCount} insights, ${eventCount} events) → ${outPath}`
);
