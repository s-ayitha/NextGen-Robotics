// ===================================================
// NextGen Robotics — small progressive-enhancement layer.
// No external requests, no analytics, no data collection.
// Everything here degrades gracefully if JS fails to load.
// ===================================================

// Highlight the current page's nav link.
(function highlightActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[data-page]').forEach((link) => {
    if (link.dataset.page === path) link.classList.add('active');
  });
})();

// Mobile nav toggle.
(function mobileNavToggle() {
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

// Fade-up reveal on scroll for anything marked .reveal.
(function scrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => observer.observe(el));
})();

// Click a photo to zoom in slightly; click again to zoom back out.
(function clickToZoom() {
  document.querySelectorAll('.zoomable').forEach((img) => {
    img.addEventListener('click', () => img.classList.toggle('zoomed'));
  });
})();
