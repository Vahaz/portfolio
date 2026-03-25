const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const el = document.querySelector('.custom-underline');
const SETTINGS = {
    entities_count: 100,
    mouse_radius: 5,
    star: {
        color: "rgb(255, 255, 255)",
        accelerate_speed: 3.0,
        speed: {
            min: 0.1,
            max: 0.4
        },
        size: {
            min: 0.75,
            max: 3.0
        },
        shadow: {
            blur: 5.0,
            offsetX: 0.0,
            offsetY: 0.0
        }
    }
}

let entities = [];
let mouse = {x: 0.0, y: 0.0};
let isMouseEnable = true;
let isCanvasEnable = true;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

function rand(min, max) { return min + Math.random() * (max - min); }

window.addEventListener("load", function() {
    if (this.navigator.userAgent.mobile) {
        isMouseEnable = false;
    }
})

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove",
    function(event) {
        mouse = {x: event.clientX, y: event.clientY};
    }
);

class Star {
    constructor() {
        this.x = rand(1, canvas.width);
        this.y = rand(1, canvas.height);
        this.speed = rand(SETTINGS.star.speed.min, SETTINGS.star.speed.max);
        this.size = rand(SETTINGS.star.size.min, SETTINGS.star.size.max);
        this.accelerate = false;
    }

    reset() {
        this.x = rand(1, canvas.width);
        this.y = canvas.height;
        this.speed = rand(SETTINGS.star.speed.min, SETTINGS.star.speed.max);
        this.size = rand(SETTINGS.star.size.min, SETTINGS.star.size.max);
        this.accelerate = false;
    }

    draw() {
        ctx.beginPath();

        ctx.shadowColor = SETTINGS.star.color;
        ctx.shadowBlur = SETTINGS.star.shadow.blur;
        ctx.shadowOffsetX = SETTINGS.star.shadow.offsetX;
        ctx.shadowOffsetY = SETTINGS.star.shadow.shadowOffsetY;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = SETTINGS.star.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (!isCanvasEnable) {
            this.draw();
            return;
        }

        if (isMouseEnable) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);

            if (distance < SETTINGS.mouse_radius) {
                this.accelerate = true
            }
        }

        if (this.accelerate) {
            this.y -= this.speed + SETTINGS.star.accelerate_speed;
        } else {
            this.y -= this.speed;
        }

        this.draw();

        if (this.y <= 0.0) {
            this.reset()
        }
    }
}

function init() {
    entities = [];
    for (let i = 0; i < SETTINGS.entities_count; i++) {
        entities.push(new Star());
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < entities.length; i++) {
        entities[i].update();
    }
}

window.addEventListener("load", function() {
    const stl = window.getComputedStyle(el);
    const color = stl.getPropertyValue('border-bottom-color');
    console.log(color);
    SETTINGS.star.color = color;
    resizeCanvas();
    animate();
});

const btn = document.getElementById("nav-theme");
btn.addEventListener("click", function() {
    const stl = window.getComputedStyle(el);
    const color = stl.getPropertyValue('border-bottom-color');
    console.log(color);
    SETTINGS.star.color = color;
});
