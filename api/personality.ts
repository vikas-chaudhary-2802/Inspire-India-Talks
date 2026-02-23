import { readFileSync } from 'fs';
import { join } from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simplified helper to find personality since importing from src might be tricky in serverless runtime
// We'll read the file directly or use a subset if needed, but let's try to import first if possible.
// For now, I'll use a simplified version or read the file.
// Better: Read the file as text and parse it if it's simple enough, or just use a small list for the most popular ones.
// Actually, I can just copy the personalities list or a way to get it.

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).send('ID is required');
    }

    try {
        // 1. Read the index.html
        const indexPath = join(process.cwd(), 'dist', 'index.html');
        let html = readFileSync(indexPath, 'utf8');

        // 2. We need the personality data. 
        // Since we are running in Vercel, we might need to fetch it or bundle it.
        // For simplicity in this script, I'll "import" the personalities if I can, 
        // but a more robust way is to have a small JSON file or fetch it.

        // For this implementation, I'll use a "mock" check or a way to get the data.
        // I will try to read the personalities file directly.
        const personalitiesPath = join(process.cwd(), 'src', 'data', 'personalities.ts');
        const content = readFileSync(personalitiesPath, 'utf8');

        // Scrutinize the content to find the specific personality
        // This is a bit hacky but works for a static-ish list without full pre-rendering
        const nameMatch = content.match(new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?name:\\s*["']([^"']+)["']`));
        const titleMatch = content.match(new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?title:\\s*["']([^"']+)["']`));
        const imageMatch = content.match(new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?image:\\s*["']([^"']+)["']`));
        const quoteMatch = content.match(new RegExp(`id:\\s*["']${id}["'][\\s\\S]*?quote:\\s*["']([^"]+)["']`));

        if (nameMatch) {
            const name = nameMatch[1];
            const title = titleMatch ? titleMatch[1] : '';
            const image = imageMatch ? imageMatch[1] : '/logo.png';
            const quote = quoteMatch ? quoteMatch[1] : '';

            const fullTitle = `${name} — Inspire India Talks`;
            const description = `${title}. ${quote}`;
            const imageUrl = `https://www.inspireindiatalks.com${image}`;
            const pageUrl = `https://www.inspireindiatalks.com/personality/${id}`;

            // 3. Inject the tags
            html = html.replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`);

            // Inject OG tags by replacing existing ones or adding if missing
            const ogMeta = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
      `;

            html = html.replace('</head>', `${ogMeta}</head>`);
        }

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(html);
    } catch (error) {
        console.error('Error injecting OG tags:', error);
        // Fallback to original index.html
        try {
            const indexPath = join(process.cwd(), 'dist', 'index.html');
            return res.status(200).send(readFileSync(indexPath, 'utf8'));
        } catch (e) {
            return res.status(500).send('Internal Server Error');
        }
    }
}
