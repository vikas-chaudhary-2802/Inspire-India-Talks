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
    const { id: rawId } = req.query;
    const id = typeof rawId === 'string' ? rawId.trim().toLowerCase() : '';

    if (!id) {
        return res.status(400).send('ID is required');
    }

    console.log(`[OG] Processing request for personality: ${id}`);

    try {
        // 1. Read index.html from the built output
        const indexPath = join(process.cwd(), 'dist', 'index.html');
        let html = readFileSync(indexPath, 'utf8');

        // 2. Read the pre-generated OG data JSON
        const ogDataPath = join(process.cwd(), 'dist', 'og-data.json');
        const ogData: PersonalityOG[] = JSON.parse(readFileSync(ogDataPath, 'utf8'));

        // 3. Find the personality by ID (case-insensitive for safety)
        const person = ogData.find(p => p.id.toLowerCase() === id);

        if (person) {
            console.log(`[OG] Found personality: ${person.name}`);
            const fullTitle = escapeHtml(`${person.name} — Inspire India Talks`);
            const description = escapeHtml(`${person.title}. ${person.knownFor}`);
            const imageUrl = `https://www.inspireindiatalks.com${person.image}`;
            const pageUrl = `https://www.inspireindiatalks.com/personality/${person.id}`;
            const twitterQuote = escapeHtml(person.quote || description);

            // 4. Update the main <title> tag
            html = html.replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`);

            // 5. Update the page-level description
            html = html.replace(
                /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
                `<meta name="description" content="${description}" />`
            );

            // 6. Replace the entire OG/Twitter block inside the markers
            const ogInjection = `<!-- OG_INJECT_START -->
  <meta property="og:title" content="${fullTitle}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${fullTitle}" />
  <meta name="twitter:description" content="${twitterQuote}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <!-- OG_INJECT_END -->`;

            html = html.replace(
                /<!-- OG_INJECT_START -->[\s\S]*?<!-- OG_INJECT_END -->/,
                ogInjection
            );
        } else {
            console.warn(`[OG] Personality ID "${id}" not found in data.`);
        }

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(html);
    } catch (error) {
        console.error('[OG] Error injecting OG tags:', error);
        // Fallback: serve original index.html
        try {
            const indexPath = join(process.cwd(), 'dist', 'index.html');
            return res.status(200).send(readFileSync(indexPath, 'utf8'));
        } catch (e) {
            return res.status(500).send('Internal Server Error');
        }
    }
}
