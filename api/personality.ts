import { readFileSync } from 'fs';
import { join } from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface PersonalityOG {
    id: string;
    name: string;
    title: string;
    image: string;
    knownFor: string;
    quote: string;
}

/** Escape special HTML characters to prevent XSS in meta tags */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).send('ID is required');
    }

    try {
        // 1. Read index.html from the built output
        const indexPath = join(process.cwd(), 'dist', 'index.html');
        let html = readFileSync(indexPath, 'utf8');

        // 2. Read the pre-generated OG data JSON
        const ogDataPath = join(process.cwd(), 'dist', 'og-data.json');
        const ogData: PersonalityOG[] = JSON.parse(readFileSync(ogDataPath, 'utf8'));

        // 3. Find the personality by ID
        const person = ogData.find(p => p.id === id);

        if (person) {
            const fullTitle = escapeHtml(`${person.name} — Inspire India Talks`);
            const description = escapeHtml(`${person.title}. ${person.knownFor}`);
            const imageUrl = `https://www.inspireindiatalks.com${person.image}`;
            const pageUrl = `https://www.inspireindiatalks.com/personality/${id}`;

            // 4. Replace the <title> tag
            html = html.replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`);

            // 5. Replace the meta description
            html = html.replace(
                /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
                `<meta name="description" content="${description}" />`
            );

            // 6. Inject personality-specific OG tags between the markers
            const ogInjection = `<!-- OG_INJECT_START -->
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${escapeHtml(person.quote)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <!-- OG_INJECT_END -->`;

            html = html.replace(
                /<!-- OG_INJECT_START -->[\s\S]*?<!-- OG_INJECT_END -->/,
                ogInjection
            );

            // 7. Replace the default static OG tags with personality-specific ones
            html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
                `<meta property="og:title" content="${fullTitle}" />`);
            html = html.replace(/<meta\s+property="og:description"[\s\S]*?\/>/,
                `<meta property="og:description" content="${description}" />`);
            html = html.replace(/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
                `<meta property="og:type" content="article" />`);
            html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
                `<meta property="og:url" content="${pageUrl}" />`);
            html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
                `<meta property="og:image" content="${imageUrl}" />`);

            html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
                `<meta name="twitter:title" content="${fullTitle}" />`);
            html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
                `<meta name="twitter:image" content="${imageUrl}" />`);
        }

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(html);
    } catch (error) {
        console.error('Error injecting OG tags:', error);
        // Fallback: serve original index.html
        try {
            const indexPath = join(process.cwd(), 'dist', 'index.html');
            return res.status(200).send(readFileSync(indexPath, 'utf8'));
        } catch (e) {
            return res.status(500).send('Internal Server Error');
        }
    }
}
