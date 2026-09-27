const CONTAINER = document.getElementById("rss-list");

async function loadSecurityBreaches() {
    try {
        const RESPONSE = await fetch('/api/rss');
        if (!RESPONSE.ok) throw new Error(`Erreur HTTP: ${RESPONSE.status}`);

        const DATA = await RESPONSE.json();
        DATA.forEach(breach => {
            const dateStr = new Date(breach.date).toLocaleDateString('fr-FR');
            console.log(`[${dateStr}] ${breach.title}\nLien: ${breach.link}`);

            let html = `
                <div class="veille-card">
                    <div class="flex flex-row justify-between items-start gap-4 w-full">
                        <h3 class="grow wrap-break-word text-white/90">${breach.title}</h3>
                        <p class="veille-option shrink-0 whitespace-nowrap">${dateStr}</p>
                    </div>
                    <div class="flex flex-row justify-between items-end gap-4 w-full mt-4">
                        <a href="${breach.link}" aria-label="Lien vers l'article" target="_blank" class="veille-btn shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link preview-icon">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                            </svg>
                            Voir l'article
                        </a>
                        <a href="${breach.journalLink}" aria-label="Lien vers le journal" target="_blank" class="veille-option hover:text-white shrink-0 whitespace-nowrap text-right">${breach.source}</a>
                    </div>
                </div>
            `;

            CONTAINER.innerHTML += html;
        });

    } catch (error) {
        console.error('Erreur de chargement du flux de données :', error);
    }
}

document.addEventListener("DOMContentLoaded", loadSecurityBreaches);
