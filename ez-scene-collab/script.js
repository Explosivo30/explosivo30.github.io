const progressBar = document.getElementById("progress-bar");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("main-nav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

menuToggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

if (reduceMotion) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal:not(.visible)").forEach((element) => revealObserver.observe(element));
}

if (!reduceMotion) {
  const canvas = document.getElementById("particles");
  const context = canvas.getContext("2d");
  const points = [];
  const pointCount = 44;
  const connectionDistance = 125;
  let width = 0;
  let height = 0;

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function createPoint() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      radius: Math.random() * 1.1 + 0.4
    };
  }

  function animateParticles() {
    context.clearRect(0, 0, width, height);

    points.forEach((point, index) => {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;

      context.beginPath();
      context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(0, 229, 255, 0.48)";
      context.fill();

      for (let next = index + 1; next < points.length; next += 1) {
        const other = points[next];
        const deltaX = point.x - other.x;
        const deltaY = point.y - other.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance >= connectionDistance) continue;

        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = "rgba(0, 229, 255, " + ((1 - distance / connectionDistance) * 0.12) + ")";
        context.lineWidth = 0.5;
        context.stroke();
      }
    });

    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  for (let index = 0; index < pointCount; index += 1) points.push(createPoint());
  window.addEventListener("resize", resizeCanvas);
  animateParticles();
}
