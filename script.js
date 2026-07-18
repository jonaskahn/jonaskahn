// ticking session timer
(function () {
  var start = Date.now();
  var el = document.getElementById('timer');
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    var elapsed = Math.floor((Date.now() - start) / 1000);
    var h = Math.floor(elapsed / 3600), m = Math.floor((elapsed % 3600) / 60), s = elapsed % 60;
    el.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
  }
  tick(); setInterval(tick, 1000);
})();

// scroll reveal
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();
