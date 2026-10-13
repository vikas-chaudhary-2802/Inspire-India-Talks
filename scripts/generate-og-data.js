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
const arrayMatch = content.match(/export\s+const\s+personalities\s*:\s*Personality\[\]\s*=\s*\[([\s\S]*)\];/);

if (!arrayMatch) {
    console.error('❌ Could not find personalities array in source file.');
    process.exit(1);
}

const arrayContent = arrayMatch[1];

/** Keep URLs, quoted braces and nested source objects inside their story block. */
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

const personalityBlocks = extractObjectBlocks(arrayContent);

function extractField(block, fieldName) {
    const regex = new RegExp(`(?:^|[{,])\\s*(?:"${fieldName}"|'${fieldName}'|${fieldName})\\s*:\\s*(["'\`])((?:\\\\[\\s\\S]|(?!\\1)[\\s\\S])*?)\\1(?=\\s*[,}])`);
    const match = block.match(regex);
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
