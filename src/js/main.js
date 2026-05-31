import "../css/style.css";
import "basecoat-css/all";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { createIcons, icons  } from "lucide";

gsap.registerPlugin(Observer);

window.addEventListener("load", () => {

    createIcons({ icons });

    // TECH BUBBLE - index.html - SHOW / HIDE LOGIC
    const btnTech = document.getElementById("btn_tech");
    const bubbleTech = document.getElementById("bubble_tech");
    if (btnTech && bubbleTech) {
        btnTech.addEventListener("click", () => {
            const icon = btnTech.children[0];
            if (bubbleTech.classList.contains("h-0")) {
                bubbleTech.classList.replace("h-0", "h-fit");
                icon.setAttribute("data-lucide", "chevron-up");
            } else {
                bubbleTech.classList.replace("h-fit", "h-0");
                icon.setAttribute("data-lucide", "chevron-down");
            }
            createIcons({ icons });
        });
    }

    // NETWORK BUBBLE - index.html - SHOW / HIDE LOGIC
    const btnRs = document.getElementById("btn_rs");
    const bubbleRs = document.getElementById("bubble_rs");
    if (btnRs && bubbleRs) {
        btnRs.addEventListener("click", () => {
            const icon = btnRs.children[0];
            if (bubbleRs.classList.contains("h-0")) {
                bubbleRs.classList.replace("h-0", "h-fit");
                icon.setAttribute("data-lucide", "chevron-up");
            } else {
                bubbleRs.classList.replace("h-fit", "h-0");
                icon.setAttribute("data-lucide", "chevron-down");
            }
            createIcons({ icons });
        });
    }

    // SOCIAL BUBBLE - index.html - SHOW / HIDE LOGIC
    const btnSc = document.getElementById("btn_sc");
    const bubbleSc = document.getElementById("bubble_sc");
    if (btnSc && bubbleSc) {
        btnSc.addEventListener("click", () => {
            const icon = btnSc.children[0];
            if (bubbleSc.classList.contains("h-0")) {
                bubbleSc.classList.replace("h-0", "h-fit");
                icon.setAttribute("data-lucide", "chevron-up");
            } else {
                bubbleSc.classList.replace("h-fit", "h-0");
                icon.setAttribute("data-lucide", "chevron-down");
            }
            createIcons({ icons });
        });
    }

    if (window.location.pathname.endsWith("project.html")) {
        // PROJECT BUTTON - project.html - SHOW / HIDE LOGIC
        const buttons = document.querySelectorAll(".pc-toggle");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const card = button.closest(".project-card");
                if (!card) return;
                card.classList.toggle("open");
            });
        });

        // PROJECT CONTAINER BUTTON - project.html - SHOW / HIDE LOGIC
        const btns = document.querySelectorAll(".project-btn");
        btns.forEach((button) => {
            button.addEventListener("click", () => {
                const container = button.nextElementSibling;
                if (!container?.classList.contains("project-container")) return;
                container.classList.toggle("open");
                button.classList.toggle("open");
            });
        });
    }
});
