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
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { id: rawId } = req.query;

    // Clean up the ID: remove trailing slashes, spaces, and lowercase it
    const id = typeof rawId === 'string'
        ? rawId.replace(/\/$/, '').trim().toLowerCase()
        : '';

    if (!id) {
        return res.status(400).send('ID is required');
    }

    // Set diagnostics headers
    res.setHeader('X-OG-ID', id);
    res.setHeader('X-OG-Timestamp', new Date().toISOString());

    try {
        // 1. Read index.html from the built output
        const indexPath = join(process.cwd(), 'dist', 'index.html');
        let html = readFileSync(indexPath, 'utf8');

        // 2. Read the pre-generated OG data JSON
        const ogDataPath = join(process.cwd(), 'dist', 'og-data.json');
        const ogData: PersonalityOG[] = JSON.parse(readFileSync(ogDataPath, 'utf8'));

        // 3. Find the personality by ID
        const person = ogData.find(p => p.id.toLowerCase() === id);

        if (person) {
            res.setHeader('X-OG-Match', 'true');
            res.setHeader('X-OG-Person', person.name);

            const name = escapeHtml(person.name || 'Inspire India Talks');
            const title = escapeHtml(person.title || '');
            const knownFor = escapeHtml(person.knownFor || '');
            const quote = escapeHtml(person.quote || '');
            const image = person.image || '/logo.png';

            const fullTitle = `${name} — Inspire India Talks`;
            const description = `${title}${title && knownFor ? '. ' : ''}${knownFor}`;
            const imageUrl = `https://inspireindiatalks.com${image}`;
            const pageUrl = `https://inspireindiatalks.com/personality/${person.id}`;
            const twitterQuote = quote || description;

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
  <meta property="og:site_name" content="Inspire India Talks" />
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
            res.setHeader('X-OG-Match', 'false');
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');

        return res.status(200).send(html);
    } catch (error) {
        res.setHeader('X-OG-Error', 'true');
        // Serve default index.html as fallback
        try {
            const indexPath = join(process.cwd(), 'dist', 'index.html');
            return res.status(200).send(readFileSync(indexPath, 'utf8'));
        } catch (e) {
            return res.status(500).send('Internal Server Error');
        }
    }
}
