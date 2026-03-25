import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

const element = document.getElementById("header-cmd");
const TEXTS = [
    "Étudiant en <strong>Cybersécurité</strong>",
    "Étudiant en <strong>BTS SIO</strong>",
    "Étudiant en <strong>Réseau</strong>",
    "Développeur <strong>auto-didacte</strong>",
    "ls etudes/",
    "cd projets/",
    "mkdir packet_tracer"
];
const cursor = '<span class="animate-blink text-amber-500">|</span>';
const isActive = true;

async function typingEffect() {
    let rand = Math.floor(Math.random() * TEXTS.length);
    let text = TEXTS[rand];
    let finalText = '';
    let tag = '';
    let isInTag = false;

    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);

        if (char === '>' && isInTag) {
            isInTag = false;
            finalText += tag;
            tag = '';
        }

        if (char === '<' || isInTag) {
            isInTag = true;
            tag += char;
        }

        if (!isInTag) {
            finalText += char;
            gsap.to(element, {
                duration: 0.1,
                text: "Valentin:~# " + finalText + cursor
            });
            await new Promise(resolve => setTimeout(resolve, 150));
        }
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    for (let i = finalText.length; i > 0; i--) {
        const subText = finalText.slice(0, i);
        gsap.to(element, {
            duration: 0.1,
            text: "Valentin:~# " + subText + cursor
        });
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    gsap.to(element, {
        duration: 0.5,
        text: "Valentin:~# " + cursor
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
}

(async function run() {
    while (isActive) {
        await typingEffect();
    }
})();
