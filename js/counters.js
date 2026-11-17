/* =========================================================
   counters.js
   Анимированные числа-счётчики .count (about.html).
   ========================================================= */
(function () {
  var counters = document.querySelectorAll('.count');
  if (!counters.length) return;

  // Форматирование: 15000 → "15 000", 4.9 → "4,9"
  function format(value, decimals, suffix) {
    var fixed = decimals > 0
      ? value.toFixed(decimals).replace('.', ',')
      : Math.round(value).toString();
    var withSpaces = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return withSpaces + (suffix || '');
  }

  function animate(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || '0', 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1400; // мс
    var start = performance.now();

    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      // easeOutCubic — плавное замедление к концу
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = format(current, decimals, suffix);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = format(target, decimals, suffix);
      }
    }

    requestAnimationFrame(frame);
  }

  // Если браузер не поддерживает IO — просто ставим конечные значения
  if (!('IntersectionObserver' in window)) {
    counters.forEach(function (el) {
      var target = parseFloat(el.dataset.count);
      var decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent = format(target, decimals, el.dataset.suffix || '');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) { observer.observe(el); });
})();