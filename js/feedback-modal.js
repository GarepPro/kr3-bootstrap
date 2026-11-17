/* =========================================================
   feedback-modal.js
   Модалка записи на приём:
   - автовыбор услуги/врача по data-атрибутам кнопки
   - «отправка» формы с тостом вместо реального запроса
   ========================================================= */
(function () {
  var modal = document.getElementById('feedbackModal');
  if (!modal) return;

  // Подстановка услуги/врача при открытии модалки
  modal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    if (!button) return;

    var service = button.getAttribute('data-service');
    var doctor = button.getAttribute('data-doctor');

    if (service) {
      var serviceSelect = modal.querySelector('#order-service');
      var serviceOpt = serviceSelect && serviceSelect.querySelector('option[value="' + service + '"]');
      if (serviceOpt) serviceOpt.selected = true;
    }

    if (doctor) {
      var doctorSelect = modal.querySelector('#order-doctor');
      var doctorOpt = doctorSelect && doctorSelect.querySelector('option[value="' + doctor + '"]');
      if (doctorOpt) doctorOpt.selected = true;
    }
  });

    // Обработка «отправки»
  var form = document.getElementById('orderForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var instance = bootstrap.Modal.getInstance(modal);
    if (instance) instance.hide();
    form.reset();

    showToast('Спасибо! Заявка отправлена – перезвоним в течение 15 минут.');
  });

  // -------------------------------------------------------
  // Простой тост без Bootstrap Toast API
  // -------------------------------------------------------
  function showToast(text) {
    // Контейнер (один на страницу)
    var container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Сам тост
    var toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.setAttribute('role', 'alert');
    toast.innerHTML =
      '<div class="toast-custom-body">' + text + '</div>' +
      '<button type="button" class="toast-custom-close" aria-label="Закрыть">×</button>';

    container.appendChild(toast);

    // Форсируем reflow, чтобы transition сработал
    void toast.offsetWidth;

    // Показываем
    toast.classList.add('is-visible');

    // Закрытие
    function close() {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', function onEnd() {
        toast.removeEventListener('transitionend', onEnd);
        toast.remove();
      });
    }

    toast.querySelector('.toast-custom-close').addEventListener('click', close);
    setTimeout(close, 4000);
  }
})();