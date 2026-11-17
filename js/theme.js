/* =========================================================
   theme.js
   Переключение темы по кнопке + реакция на системную тему,
   если пользователь выбрал "auto".
   ========================================================= */
(function () {
  var html = document.documentElement;
  var STORAGE_KEY = 'beliy-klyuch-theme';
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var current = html.getAttribute('data-bs-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Если выбрано "auto" — слушаем изменение системной темы
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if ((localStorage.getItem(STORAGE_KEY) || 'auto') === 'auto') {
      html.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
    }
  });
})();