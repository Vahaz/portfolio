import Parser from 'rss-parser';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    if (req.method !== 'GET') return res.status(405).json({ error: 'Méthode non autorisée' });

    const parser = new Parser({
        customFields: {
            item: ['source', 'sourceUrl']
        }
    });

    try {
        const response = await fetch('https://news.google.com/rss/search?q="fuite+de+données"&hl=fr&gl=FR&ceid=FR:fr');
        let xmlData = await response.text();

        xmlData = xmlData.replace(/<source url="([^"]+)">/g, '<sourceUrl>$1</sourceUrl><source>');

        const feed = await parser.parseString(xmlData);

        const breaches = feed.items.slice(0, 5).map(item => {
            const lastDashIndex = item.title.lastIndexOf(' - ');
            let cleanTitle = item.title;

            if (lastDashIndex !== -1) cleanTitle = item.title.substring(0, lastDashIndex).trim();

            return {
                title: cleanTitle,
                source: item.source || 'Source inconnue',
                journalLink: item.sourceUrl || '#',
                link: item.link,
                date: item.pubDate
            };
        });

        return res.status(200).json(breaches);
    } catch (error) {
        console.error('Erreur lors du parsing RSS :', error);
        return res.status(500).json({ error: 'Impossible de récupérer les alertes de sécurité' });
    }
}
