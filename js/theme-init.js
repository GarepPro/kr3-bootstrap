/* =========================================================
   theme-init.js
   Применяет сохранённую/системную тему ДО отрисовки,
   чтобы не было мигания светлой темы.
   Подключается в <head> БЕЗ defer.
   ========================================================= */
(function () {
  try {
    var saved = localStorage.getItem('beliy-klyuch-theme') || 'auto';
    var theme = saved === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : saved;

    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.classList.add('no-transition');
  } catch (e) {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }
})();