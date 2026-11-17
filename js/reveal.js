/* =========================================================
   reveal.js
   Появление .reveal при прокрутке + каскад по индексу.
   ========================================================= */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Каскад: каждому элементу в группе — свой --i
  // Группируем по родителю, чтобы задержка считалась внутри сетки
  var groups = new Map();
  items.forEach(function (el) {
    var parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    var idx = groups.get(parent);
    el.style.setProperty('--i', idx);
    groups.set(parent, idx + 1);
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach(function (el) { observer.observe(el); });
})();