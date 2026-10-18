(() => {
  if (new URLSearchParams(location.search).has('static')) document.documentElement.classList.add('static');
  // Seamless marquee: duplicate each row once (the animation moves it by -50%).
  document.querySelectorAll('.marquee__row').forEach(row => { row.innerHTML += row.innerHTML; });

  // Scroll reveal fallback for browsers without CSS scroll-driven animations.
  const els = document.querySelectorAll('.r');
  if (CSS.supports('animation-timeline: view()') || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();
