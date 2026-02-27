import { readFileSync } from 'fs';
import { join } from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface EventOG {
    id: string;
    slug: string;
    title: string;
    tagline: string;
    coverImage: string;
    shortDescription: string;
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
    const { slug: rawSlug } = req.query;

    const slug = typeof rawSlug === 'string'
        ? rawSlug.replace(/\/$/, '').trim().toLowerCase()
        : '';

    if (!slug) {
        return res.status(400).send('Slug is required');
    }

    res.setHeader('X-OG-Event-Slug', slug);
    res.setHeader('X-OG-Timestamp', new Date().toISOString());

    try {
        const indexPath = join(process.cwd(), 'dist', 'index.html');
        let html = readFileSync(indexPath, 'utf8');

        const ogDataPath = join(process.cwd(), 'dist', 'events-og-data.json');
        const ogData: EventOG[] = JSON.parse(readFileSync(ogDataPath, 'utf8'));

        const event = ogData.find(e => e.slug.toLowerCase() === slug);

        if (event) {
            res.setHeader('X-OG-Match', 'true');
            res.setHeader('X-OG-Event', event.title);

            const title = escapeHtml(event.title || 'Inspire India Talks Event');
            const tagline = escapeHtml(event.tagline || '');
            const shortDescription = escapeHtml(event.shortDescription || tagline);
            const image = event.coverImage || '/logo.png';

            const fullTitle = `${title} — Inspire India Talks`;
            const description = shortDescription;
            const imageUrl = `https://inspireindiatalks.com${image}`;
            const pageUrl = `https://inspireindiatalks.com/events/${event.slug}`;

            html = html.replace(/<title>.*?<\/title>/, `<title>${fullTitle}</title>`);

            html = html.replace(
                /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
                `<meta name="description" content="${description}" />`
            );

            const ogInjection = `<!-- OG_INJECT_START -->
  <meta property="og:title" content="${fullTitle}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Inspire India Talks" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${fullTitle}" />
  <meta name="twitter:description" content="${description}" />
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
        try {
            const indexPath = join(process.cwd(), 'dist', 'index.html');
            return res.status(200).send(readFileSync(indexPath, 'utf8'));
        } catch (e) {
            return res.status(500).send('Internal Server Error');
        }
    }
}
