'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.effect = function (element) {
    var message = element.cloneNode(true);
    document.body.appendChild(message);

    var onMessageClose = function (evt) {
      if (evt.target !== message.querySelector('.error__message') && evt.target !== message.querySelector('.success__message') || evt.target === message.querySelector('.error__button')) {
        message.remove();
      }
    };

    message.addEventListener('click', function (evt) {
      onMessageClose(evt);
    });

    message.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        onMessageClose(evt);
      }
    });
  };
})();
