import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

let html = readFileSync(join(root, 'dist', 'index.html'), 'utf8');
const ogData = JSON.parse(readFileSync(join(root, 'dist', 'og-data.json'), 'utf8'));
const person = ogData.find(p => p.id === 'ratan-tata');

const fullTitle = `${person.name} — Inspire India Talks`;
const description = `${person.title}. ${person.knownFor}`;
const imageUrl = `https://www.inspireindiatalks.com${person.image}`;
const pageUrl = `https://www.inspireindiatalks.com/personality/ratan-tata`;

// Replace title
html = html.replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`);

// Replace meta description
html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`
);

// Inject between markers
const ogInjection = `<!-- OG_INJECT_START -->
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <!-- OG_INJECT_END -->`;

html = html.replace(
    /<!-- OG_INJECT_START -->[\s\S]*?<!-- OG_INJECT_END -->/,
    ogInjection
);

// Replace static OG tags
html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${fullTitle}" />`);
html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${imageUrl}" />`);
html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${fullTitle}" />`);
html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${imageUrl}" />`);

// Show the head section
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
console.log('=== HEAD SECTION ===');
console.log(head);

// Check for duplicate og:image
const ogImageMatches = html.match(/og:image/g);
console.log('\n=== DUPLICATE CHECK ===');
console.log('og:image occurrences:', ogImageMatches ? ogImageMatches.length : 0);
console.log('og:title occurrences:', (html.match(/og:title/g) || []).length);
