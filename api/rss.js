import Parser from 'rss-parser';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    if (req.method !== 'GET') return res.status(405).json({ error: 'Méthode non autorisée' });

    const parser = new Parser();

    try {
        const feed = await parser.parseURL('https://news.google.com/rss/search?q="fuite+de+données"&hl=fr&gl=FR&ceid=FR:fr');
        const breaches = feed.items.slice(0, 5).map(item => ({
            title: item.title,
            link: item.link,
            date: item.pubDate,
            summary: item.contentSnippet ? item.contentSnippet.substring(0, 150) + '...' : ''
        }));

        return res.status(200).json(breaches);
    } catch (error) {
        console.error('Erreur lors du parsing RSS :', error);
        return res.status(500).json({ error: 'Impossible de récupérer les alertes de sécurité' });
    }
}
