import { readFileSync } from 'fs';
import { join } from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const indexPath = join(process.cwd(), 'dist', 'index.html');
        let html = readFileSync(indexPath, 'utf8');

        const title = 'Founders Talk — Inspire India Talks';
        const description = 'Long-form conversations with builders, operators, and visionaries shaping India\'s future. Apply to be featured.';
        const imageUrl = 'https://www.inspireindiatalks.com/images/founders-talk-og.png';
        const pageUrl = 'https://www.inspireindiatalks.com/founders-talk';

        // Replace title
        html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

        // Inject OG + Twitter meta tags before </head>
        const ogMeta = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    `;

        html = html.replace('</head>', `${ogMeta}</head>`);

        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(html);
    } catch (error) {
        console.error('Error injecting OG tags for founders-talk:', error);
        try {
            const indexPath = join(process.cwd(), 'dist', 'index.html');
            return res.status(200).send(readFileSync(indexPath, 'utf8'));
        } catch {
            return res.status(500).send('Internal Server Error');
        }
    }
}
