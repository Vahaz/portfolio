import "../css/style.css";
import "basecoat-css/all";
import { gsap } from 'gsap';
import { Observer } from "gsap/Observer";
import { createIcons, icons  } from 'lucide';

gsap.registerPlugin(Observer);

window.addEventListener("load", () => {
    createIcons({ icons });

    const cards = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.project-dot');
    const container = document.querySelector('#project-container');
    let currentIndex = 0;
    let isAnimating = false;

    if (cards.length > 0) {
        gsap.set(container, { height: cards[0].offsetHeight });
    }

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

        tl.to(outgoing, { xPercent: direction * -100, opacity: 0, duration: 0.3, ease: "power2.inOut", onComplete: () => gsap.set(outgoing, { visibility: 'hidden' }) }, 0);

        gsap.set(incoming, { xPercent: direction * 100, opacity: 0, visibility: 'visible' });
        tl.to(incoming, { xPercent: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }, 0);

        dots.forEach((dot, i) => {
            gsap.to(dot, { backgroundColor: i === targetIndex ? '#f59e0b' : '#181716' });
        });
    }

    window.addEventListener('resize', () => {
        gsap.set(container, { height: cards[currentIndex].offsetHeight });
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => gotoProject(i, i > currentIndex ? 1 : -1));
    });

    Observer.create({
        target: "#project-container",
        type: "wheel,touch,pointer",
        onUp: () => gotoProject(currentIndex - 1, -1),
        onDown: () => gotoProject(currentIndex + 1, 1),
        tolerance: 10,
        preventDefault: true
    });
});
