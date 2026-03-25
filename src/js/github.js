(async function loadGithubProjects() {
    const container = document.getElementById("projects-list");
    if (!container) return;

    const data = localStorage.getItem("gh_projects_data");
    const time = localStorage.getItem("gh_projects_time");
    const now = Date.now();

    let projects = [];

    try {
        if (data && time && (now - parseInt(time) < (60 * 60 * 1000))) {
            projects = JSON.parse(data);
        }
        else {
            const response = await fetch(`https://api.github.com/users/Vahaz/repos?sort=updated&direction=desc`);

            if (!response.ok) throw new Error("Erreur API");

            const rawData = await response.json();
            rawData.slice(0, 6).forEach(repo => {
                let badgeInfo = new Date(repo.created_at).getFullYear();
                if (repo.archived) badgeInfo = "ARCHIVED";
                if (!repo.archived && repo.disabled) badgeInfo = "DISABLED";

                projectArray.push({
                    name: repo.name,
                    description: repo.description || "",
                    badge: badgeInfo,
                    url: repo.html_url
                });
            });

            localStorage.setItem("gh_projects_data", JSON.stringify(projects));
            localStorage.setItem("gh_projects_time", now.toString());
        }

        container.innerHTML = "";
        projects.forEach(project => {
            const li = document.createElement("li");
            li.className = "card-item";
            li.style.cursor = "pointer";
            li.onclick = () => window.open(project.url, '_blank');
            li.innerHTML = `
                <img src="asset/image/project.png" alt="${project.name}">
                <div class="card-content">
                    <h2><span>${project.badge}</span>${project.name}</h2>
                    <p>${project.description}</p>
                </div>
            `;

            container.appendChild(li);
        });

    } catch (error) {
        return;
    }
})();
