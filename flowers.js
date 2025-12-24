const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let time = 0;

// 🌸 Flower Bloom
function drawFlower(x, y, bloom) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(bloom, bloom);

    for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,182,193,0.9)";
        ctx.shadowColor = "#ffb6c1";
        ctx.shadowBlur = 15;
        ctx.ellipse(0, -14, 7, 14, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.beginPath();
    ctx.fillStyle = "#fff4a3";
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

// 🍃 Leaf
function drawLeaf(x, y, angle, sway) {
    ctx.save();
    ctx.translate(x + sway * 5, y);
    ctx.rotate(angle + sway * 0.2);
    ctx.fillStyle = "#1e8449";
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// 🌿 Plant with growth + sway
let growth = 0;

function drawPlant() {
    const baseX = canvas.width / 2;
    const baseY = canvas.height - 150;
    const maxHeight = 240;

    if (growth < 1) growth += 0.002;

    const sway = Math.sin(time * 0.02) * 10;
    const stemHeight = maxHeight * growth;

    // BIG STEM
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(baseX, baseY);
    ctx.lineTo(baseX + sway, baseY - stemHeight);
    ctx.stroke();

    const branches = [
        { offset: 70, side: -1 },
        { offset: 110, side: 1 },
        { offset: 150, side: -1 },
        { offset: 190, side: 1 }
    ];

    branches.forEach((b, i) => {
        if (growth < (i + 1) * 0.2) return;

        const y = baseY - b.offset;
        const bx = baseX + sway;
        const ex = bx + b.side * 70;
        const ey = y - 40;

        ctx.strokeStyle = "#27ae60";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(bx, y);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        drawLeaf((bx + ex) / 2, y - 5, b.side * 0.5, sway / 10);

        drawFlower(ex, ey, Math.min(1, (growth - i * 0.15) * 1.5));
    });

    // Top flower
    if (growth > 0.8) {
        drawFlower(baseX + sway, baseY - stemHeight - 10, growth);
    }
}

// ✨ Glowing particles
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = "rgba(255,255,200,0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = Array.from({ length: 40 }, () => new Particle());

// 💕 Hearts
class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 1;
    }

    update() {
        this.y -= 1;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "pink";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - 12, this.y - 12, this.x - 24, this.y + 6, this.x, this.y + 24);
        ctx.bezierCurveTo(this.x + 24, this.y + 6, this.x + 12, this.y - 12, this.x, this.y);
        ctx.fill();
        ctx.restore();
    }
}

const hearts = [];

canvas.addEventListener("click", e => {
    for (let i = 0; i < 5; i++) hearts.push(new Heart(e.clientX, e.clientY));
});

canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];
    for (let i = 0; i < 5; i++) hearts.push(new Heart(t.clientX, t.clientY));
});

// 🎬 Animate
function animate() {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = "#145a32";
    ctx.fillRect(0, canvas.height - 150, canvas.width, 150);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawPlant();

    hearts.forEach((h, i) => {
        h.update();
        h.draw();
        if (h.alpha <= 0) hearts.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();
