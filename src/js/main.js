import "../css/style.css";
import "basecoat-css/all";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { createIcons, icons  } from "lucide";

gsap.registerPlugin(Observer);

window.addEventListener("load", () => {

    createIcons({ icons });

    // PROJECT LIST - index.html - SCROLL LOGIC
    const container = document.querySelector("#project-container");
    if (container) {
        const cards = document.querySelectorAll(".project-card");
        const dots = document.querySelectorAll(".project-dot");
        let currentIndex = 0;
        let isAnimating = false;

        // UPDATE CARD HEIGHT
        if (cards.length > 0) gsap.set(container, { height: cards[0].offsetHeight });

        // SCROLL ANIMATION / CONTENT UPDATE
        function gotoProject(index, direction) {
            if (isAnimating || index === currentIndex || cards.length === 0) return;
            isAnimating = true;

            const targetIndex = (index + cards.length) % cards.length;
            const outgoing = cards[currentIndex];
            const incoming = cards[targetIndex];

            const tl = gsap.timeline({
                onComplete: () => {
                    currentIndex = targetIndex;
                    isAnimating = false;
                }
            });

            tl.to(container, {
                height: incoming.offsetHeight,
                duration: 0.5,
                ease: "power2.inOut"
            }, 0);

            gsap.set(incoming, { zIndex: 10 });
            gsap.set(outgoing, { zIndex: 0 });

            tl.to(outgoing, { xPercent: direction * -100, opacity: 0, duration: 0.3, ease: "power2.inOut", onComplete: () => gsap.set(outgoing, { visibility: "hidden" }) }, 0);

            gsap.set(incoming, { xPercent: direction * 100, opacity: 0, visibility: "visible" });
            tl.to(incoming, { xPercent: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0);

            dots.forEach((dot, i) => {
                gsap.to(dot, { backgroundColor: i === targetIndex ? "#f59e0b" : "#181716" });
            });
        }

        window.addEventListener("resize", () => {
            gsap.set(container, { height: cards[currentIndex].offsetHeight });
        });

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => gotoProject(i, i > currentIndex ? 1 : -1));
        });

        Observer.create({
            target: container,
            type: "wheel,touch,pointer",
            onUp: () => gotoProject(currentIndex - 1, -1),
            onDown: () => gotoProject(currentIndex + 1, 1),
            tolerance: 10,
            preventDefault: true
        });
    }

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
});
