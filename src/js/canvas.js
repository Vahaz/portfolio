const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const SETTINGS = {
    entities_count: 200,
    star: {
        color: "rgb(34, 33, 32)",
        speed: {
            min: 0.1,
            max: 0.4
        },
        size: {
            min: 1.0, // .75
            max: 5.0   // 3.0
        },
        shadow: {
            color: "rgb(48, 46, 44)",
            blur: 5.0,
            offsetX: 0.0,
            offsetY: 0.0
        }
    }
}

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

function rand(min, max) { return min + Math.random() * (max - min); }

window.addEventListener("resize", resizeCanvas);

class Star {
    constructor() {
        this.x = rand(1, canvas.width);
        this.y = rand(1, canvas.height);
        this.speed = rand(SETTINGS.star.speed.min, SETTINGS.star.speed.max);
        this.size = rand(SETTINGS.star.size.min, SETTINGS.star.size.max);
    }

    reset() {
        this.x = rand(1, canvas.width);
        this.y = canvas.height;
        this.speed = rand(SETTINGS.star.speed.min, SETTINGS.star.speed.max);
        this.size = rand(SETTINGS.star.size.min, SETTINGS.star.size.max);
    }

    draw() {
        ctx.beginPath();

        ctx.shadowColor = SETTINGS.star.shadow.color;
        ctx.shadowBlur = SETTINGS.star.shadow.blur;
        ctx.shadowOffsetX = SETTINGS.star.shadow.offsetX;
        ctx.shadowOffsetY = SETTINGS.star.shadow.shadowOffsetY;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = SETTINGS.star.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {

        for (let i = 0; i < stars.length; i++) {
            let dx = this.x - stars[i].x;
            let dy = this.y - stars[i].y;
            let count = 0;
            if ((dx > 0 && dx < 100.0) && (dy > 0 && dy < 100.0)) {
                if (count > 5) { continue; }
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(stars[i].x, stars[i].y);
                ctx.strokeStyle = SETTINGS.star.shadow.color;
                ctx.stroke();
                count++;
            }
        }

        this.y -= this.speed;
        this.draw();
        if (this.y <= 0.0) this.reset()
    }
}

function init() {
    stars = [];
    for (let i = 0; i < SETTINGS.entities_count; i++) {
        stars.push(new Star());
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
    }
}

resizeCanvas();
init();
animate();
