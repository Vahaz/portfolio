import "../css/style.css";
import "basecoat-css/all";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { createIcons, icons  } from "lucide";

gsap.registerPlugin(Observer);

window.addEventListener("load", () => {
    createIcons({ icons });
});
