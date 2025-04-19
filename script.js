// Warp Animation Script
const canvas = document.getElementById("warp-canvas");
const ctx = canvas.getContext("2d");
let width, height, cx, cy;
const lineColor = "#0066ff";
const lineCount = 200;
const maxDistance = 1000;
const speed = 3;

class Line {
  constructor() {
    this.reset();
  }
  reset() {
    this.angle = Math.random() * 2 * Math.PI;
    this.distance = Math.random() * maxDistance;
    this.length = 20 + Math.random() * 40;
    this.speed = speed * (0.5 + Math.random());
  }
  update() {
    this.distance += this.speed;
    if (this.distance > maxDistance) {
      this.reset();
      this.distance = 0;
    }
  }
  draw() {
    const startX = cx + Math.cos(this.angle) * this.distance;
    const startY = cy + Math.sin(this.angle) * this.distance;
    const endX = cx + Math.cos(this.angle) * (this.distance + this.length);
    const endY = cy + Math.sin(this.angle) * (this.distance + this.length);

    const alpha = 1 - this.distance / maxDistance;

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.shadowColor = lineColor;
    ctx.shadowBlur = 10;
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

let lines = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  cx = width / 2;
  cy = height / 2;
}

function init() {
  lines = [];
  for (let i = 0; i < lineCount; i++) {
    lines.push(new Line());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (const line of lines) {
    line.update();
    line.draw();
  }
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  resize();
  init();
});

resize();
init();
animate();

// Typed.js Initialization
const typed = new Typed("#typed-text", {
  strings: ["Part-Time Streamer", "Video Editor", "Gamer", "Content Creator"],
  typeSpeed: 70,
  backSpeed: 50,
  backDelay: 1500,
  loop: true,
});

// ScrollReveal Animations
ScrollReveal().reveal("#floating-container h2", { delay: 200, origin: "top", distance: "50px" });
ScrollReveal().reveal("#floating-container p", { delay: 400, origin: "bottom", distance: "50px" });
ScrollReveal().reveal("#about", { delay: 300, origin: "left", distance: "50px" });
ScrollReveal().reveal("#services", { delay: 300, origin: "bottom", distance: "50px" });
ScrollReveal().reveal("#portfolio", { delay: 300, origin: "bottom", distance: "50px" });
ScrollReveal().reveal("#contact", { delay: 300, origin: "right", distance: "50px" });

// Navigation and section switching
const navLinks = document.querySelectorAll("#nav-links a");
const sections = document.querySelectorAll("section");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-section");

    // Remove active class from all links and sections
    navLinks.forEach((l) => l.classList.remove("active"));
    sections.forEach((sec) => sec.classList.remove("active"));

    // Add active class to clicked link and corresponding section
    link.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
