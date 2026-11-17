/* =========================================================
   chat.js
   Простой чат-виджет с имитацией ответов консультанта.
   ========================================================= */
(function () {
  var form = document.getElementById('chatForm');
  var input = document.getElementById('chatInput');
  var messages = document.getElementById('chatMessages');
  if (!form || !input || !messages) return;

  var replies = [
    'Спасибо! Уточню у администратора и вернусь с ответом.',
    'Могу записать вас на приём. Удобно сегодня или завтра?',
    'По ценам сориентирую: консультация – бесплатно, точная стоимость – после осмотра.',
    'Если острая боль – позвоните нам: +7 (495) 123-45-67, примем в день обращения.'
  ];

  var i = 0;

  function addMessage(text, who) {
    var wrap = document.createElement('div');
    wrap.className = 'chat-msg mb-3 ' + (who === 'user' ? 'chat-msg-user' : 'chat-msg-bot');

    var bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;

    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // Имитация ответа через 800 мс
    setTimeout(function () {
      addMessage(replies[i % replies.length], 'bot');
      i++;
    }, 800);
  });
})();