/* ── CURSOR ─────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

/* ── SCROLL PROGRESS BAR ────────────────────────────── */
const bar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const max = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / max * 100) + '%';
}, { passive: true });

/* ── SCROLL REVEAL ──────────────────────────────────── */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

/* ── SMOOTH SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── TYPING ANIMATION ───────────────────────────────── */
(function () {
  const words = ['games.', 'tools.', 'experiments.', 'prototypes.'];
  const el = document.getElementById('typed');
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, 1600); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 55 : 90);
  }
  setTimeout(tick, 1400);
})();

/* ── ANIMATED STAT COUNTERS ─────────────────────────── */
const statIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const start  = performance.now();
    const dur    = 1400;
    (function step(now) {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target);
      if (p < 1) requestAnimationFrame(step);
    })(start);
    statIO.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-val[data-target]').forEach(el => statIO.observe(el));

/* ── MODAL / LIGHTBOX ───────────────────────────────── */
const overlay    = document.getElementById('modal-overlay');
const modalImgEl = document.getElementById('modal-img-area');
const modalTag   = document.getElementById('modal-tag');
const modalTitle = document.getElementById('modal-title');
const modalDesc  = document.getElementById('modal-desc');
const modalLink  = document.getElementById('modal-link');
const modalClose = document.getElementById('modal-close');

function openModal(card) {
  const img   = card.dataset.img   || '';
  const tag   = card.dataset.tag   || '';
  const title = card.dataset.title || '';
  const desc  = card.dataset.desc  || '';
  const href  = card.dataset.href  || '#';

  modalImgEl.innerHTML = img
    ? `<img class="modal-img" src="${img}" alt="${title}" onerror="this.parentElement.innerHTML='<div class=modal-img-placeholder>[ no image ]</div>'">`
    : `<div class="modal-img-placeholder">[ no image ]</div>`;

  modalTag.textContent   = tag;
  modalTitle.textContent = title;
  modalDesc.textContent  = desc;
  modalLink.href         = href;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.card[data-href]').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── PARTICLES ──────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  const N = 65, CONNECT = 130;
  let W, H;
  const pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < N; i++) {
    pts.push({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r:  Math.random() * 1.4 + .5
    });
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < N; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,229,255,.55)';
      ctx.fill();

      for (let j = i + 1; j < N; j++) {
        const q  = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,229,255,${(1 - d / CONNECT) * .15})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
})();