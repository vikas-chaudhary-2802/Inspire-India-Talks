/**
 * Post-build script: Extracts OG-relevant event data and writes to dist/events-og-data.json.
 * This JSON file is consumed by the Vercel serverless API function at runtime.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const srcPath = join(ROOT, 'src', 'data', 'events.ts');
const distPath = join(ROOT, 'dist', 'events-og-data.json');

if (!existsSync(join(ROOT, 'dist'))) {
    console.error('❌ dist/ directory not found. Run "vite build" first.');
    process.exit(1);
}

const content = readFileSync(srcPath, 'utf8');

// Extract each event object block from the array
const eventBlocks = [];
const arrayMatch = content.match(/export\s+const\s+events\s*:\s*Event\[\]\s*=\s*\[([\s\S]*)\];/);

if (!arrayMatch) {
    console.error('❌ Could not find events array in source file.');
    process.exit(1);
}

const arrayContent = arrayMatch[1];

// Match each object block { ... }
let depth = 0;
let blockStart = -1;

for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];

    // Skip line comments
    if (char === '/' && arrayContent[i + 1] === '/') {
        while (i < arrayContent.length && arrayContent[i] !== '\n') i++;
        continue;
    }

    if (char === '{') {
        if (depth === 0) blockStart = i;
        depth++;
    } else if (char === '}') {
        depth--;
        if (depth === 0 && blockStart !== -1) {
            eventBlocks.push(arrayContent.substring(blockStart, i + 1));
            blockStart = -1;
        }
    }
}

function extractField(block, fieldName) {
    const regex = new RegExp(`${fieldName}\\s*:\\s*["'\`]([\\s\\S]*?)["'\`]\\s*[,}]`);
    const match = block.match(regex);
    return match ? match[1].trim() : '';
}

const ogData = eventBlocks.map(block => {
    const id = extractField(block, 'id');
    const slug = extractField(block, 'slug');
    if (!id || !slug) return null;

    return {
        id,
        slug,
        title: extractField(block, 'title'),
        tagline: extractField(block, 'tagline'),
        coverImage: extractField(block, 'coverImage'),
        shortDescription: extractField(block, 'shortDescription'),
    };
}).filter(Boolean);

writeFileSync(distPath, JSON.stringify(ogData, null, 2), 'utf8');
console.log(`✅ Generated events-og-data.json with ${ogData.length} events → ${distPath}`);
