/**
 * Post-build script: Extracts OG-relevant personality data and writes to dist/og-data.json.
 * This JSON file is consumed by the Vercel serverless API function at runtime.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const srcPath = join(ROOT, 'src', 'data', 'personalities.ts');
const distPath = join(ROOT, 'dist', 'og-data.json');

if (!existsSync(join(ROOT, 'dist'))) {
    console.error('❌ dist/ directory not found. Run "vite build" first.');
    process.exit(1);
}

const content = readFileSync(srcPath, 'utf8');

// Extract each personality object block from the array
const personalityBlocks = [];
const arrayMatch = content.match(/export\s+const\s+personalities\s*:\s*Personality\[\]\s*=\s*\[([\s\S]*)\];/);

if (!arrayMatch) {
    console.error('❌ Could not find personalities array in source file.');
    process.exit(1);
}

const arrayContent = arrayMatch[1];

// Match each object block { ... }
// We use a state-machine approach to handle nested brackets in achievements arrays
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
            personalityBlocks.push(arrayContent.substring(blockStart, i + 1));
            blockStart = -1;
        }
    }
}

function extractField(block, fieldName) {
    // Match field: "value" or field: 'value' — handles multi-line by using [\s\S]
    const regex = new RegExp(`${fieldName}\\s*:\\s*["'\`]([\\s\\S]*?)["'\`]\\s*[,}]`);
    const match = block.match(regex);
    return match ? match[1].trim() : '';
}

const ogData = personalityBlocks.map(block => {
    const id = extractField(block, 'id');
    if (!id) return null;

    return {
        id,
        name: extractField(block, 'name'),
        title: extractField(block, 'title'),
        image: extractField(block, 'image'),
        knownFor: extractField(block, 'knownFor'),
        quote: extractField(block, 'quote'),
    };
}).filter(Boolean);

writeFileSync(distPath, JSON.stringify(ogData, null, 2), 'utf8');
console.log(`✅ Generated og-data.json with ${ogData.length} personalities → ${distPath}`);
