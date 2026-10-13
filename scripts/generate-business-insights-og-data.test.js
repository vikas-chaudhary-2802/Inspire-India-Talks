import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

test('business OG generation retains the next article after inline HTTPS sources', () => {
    const root = mkdtempSync(join(tmpdir(), 'business-insights-og-'));
    try {
        mkdirSync(join(root, 'scripts'));
        mkdirSync(join(root, 'src', 'data'), { recursive: true });
        mkdirSync(join(root, 'dist'));
        writeFileSync(join(root, 'package.json'), '{"type":"module"}');
        const script = join(root, 'scripts', 'generate-business-insights-og-data.js');
        copyFileSync(fileURLToPath(new URL('./generate-business-insights-og-data.js', import.meta.url)), script);
        writeFileSync(join(root, 'src', 'data', 'businessinsights.ts'), `
export const businessinsights: BusinessInsight[] = [
    // { id: "template", title: "Ignore this example" },
    {
        id: "first-article",
        title: "First article",
        date: "14-10-2026",
        category: "Business",
        image: "/images/first.jpg",
        excerpt: "First excerpt",
        content: \`Body text with { unmatched braces and https://example.com.\`,
        sources: [{ title: "Official source", url: "https://example.com/report" }],
    },
    {
        id: "next-article",
        title: "Next article",
        date: "13-10-2026",
        category: "Business",
        image: "/images/next.jpg",
        excerpt: "Next excerpt",
        content: "Second body",
    },
];
`);
        execFileSync(process.execPath, [script], { cwd: root });
        const articles = JSON.parse(readFileSync(join(root, 'dist', 'business-insights-og-data.json'), 'utf8'));
        assert.deepEqual(articles, [
            { id: 'first-article', title: 'First article', excerpt: 'First excerpt', image: '/images/first.jpg', category: 'Business', date: '14-10-2026' },
            { id: 'next-article', title: 'Next article', excerpt: 'Next excerpt', image: '/images/next.jpg', category: 'Business', date: '13-10-2026' },
        ]);
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});

test('business OG generation decodes JSON quoted keys and escaped strings alongside existing TypeScript', () => {
    const root = mkdtempSync(join(tmpdir(), 'business-insights-og-json-'));
    try {
        mkdirSync(join(root, 'scripts'));
        mkdirSync(join(root, 'src', 'data'), { recursive: true });
        mkdirSync(join(root, 'dist'));
        writeFileSync(join(root, 'package.json'), '{"type":"module"}');
        const script = join(root, 'scripts', 'generate-business-insights-og-data.js');
        copyFileSync(fileURLToPath(new URL('./generate-business-insights-og-data.js', import.meta.url)), script);
        const article = {
            id: 'json-article', title: 'A "quoted, title" with a literal \\n', date: '14-10-2026', image: '/images/json-article.jpg',
            excerpt: 'First line.\nSecond line with a literal \\n.', content: 'Safe text with backticks `, unmatched { braces and https://example.com.',
            category: 'Business / Strategy', sources: [{ title: 'Wrong nested title', url: 'https://example.com/report' }],
        };
        const serialized = JSON.stringify(article).replace('"json-article"', '"json-\\u0061rticle"');
        writeFileSync(join(root, 'src', 'data', 'businessinsights.ts'), `export const businessinsights: BusinessInsight[] = [
${serialized},
{ id: 'existing-article', title: 'Existing \\'quoted\\' title', date: '13-10-2026', image: '/images/existing.jpg', excerpt: 'Existing excerpt', category: 'Business', content: 'Existing body' },
];`);
        execFileSync(process.execPath, [script], { cwd: root });
        const articles = JSON.parse(readFileSync(join(root, 'dist', 'business-insights-og-data.json'), 'utf8'));
        assert.deepEqual(articles, [
            { id: article.id, title: article.title, excerpt: article.excerpt, image: article.image, category: article.category, date: article.date },
            { id: 'existing-article', title: "Existing 'quoted' title", excerpt: 'Existing excerpt', image: '/images/existing.jpg', category: 'Business', date: '13-10-2026' },
        ]);
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});
