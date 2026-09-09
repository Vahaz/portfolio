const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
const SETTINGS = {
    entities_count: 200,
    circle: {
        color: "rgb(30, 26, 32)",
        speed: {
            min: 0.1,
            max: 0.4
        },
        size: {
            min: 1.0, // .75
            max: 5.0   // 3.0
        },
        shadow: {
            color: "rgb(28, 26, 29)",
            blur: 5.0,
            offsetX: 0.0,
            offsetY: 0.0
        }
    }
}

let circles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

function rand(min, max) { return min + Math.random() * (max - min); }

window.addEventListener("resize", resizeCanvas);

class Circle {
    constructor() {
        this.x = rand(1, canvas.width);
        this.y = rand(1, canvas.height);
        this.speed = rand(SETTINGS.circle.speed.min, SETTINGS.circle.speed.max);
        this.size = rand(SETTINGS.circle.size.min, SETTINGS.circle.size.max);
    }

    reset() {
        this.x = rand(1, canvas.width);
        this.y = canvas.height;
        this.speed = rand(SETTINGS.circle.speed.min, SETTINGS.circle.speed.max);
        this.size = rand(SETTINGS.circle.size.min, SETTINGS.circle.size.max);
    }

    draw() {
        ctx.beginPath();

        ctx.shadowColor = SETTINGS.circle.shadow.color;
        ctx.shadowBlur = SETTINGS.circle.shadow.blur;
        ctx.shadowOffsetX = SETTINGS.circle.shadow.offsetX;
        ctx.shadowOffsetY = SETTINGS.circle.shadow.shadowOffsetY;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = SETTINGS.circle.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {

        for (let i = 0; i < circles.length; i++) {
            let dx = this.x - circles[i].x;
            let dy = this.y - circles[i].y;
            let count = 0;
            if ((dx > 0 && dx < 100.0) && (dy > 0 && dy < 100.0)) {
                if (count > 5) { continue; }
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(circles[i].x, circles[i].y);
                ctx.strokeStyle = SETTINGS.circle.shadow.color;
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
    circles = [];
    for (let i = 0; i < SETTINGS.entities_count; i++) {
        circles.push(new Circle());
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

resizeCanvas();
init();
animate();
