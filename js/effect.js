'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.effect = function (element) {
    var message = element.cloneNode(true);
    document.body.appendChild(message);

    document.addEventListener('click', function () {
      message.remove();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        message.remove();
      }
    });

    if (message.querySelector('.error__button')) {
      message.querySelector('.error__button').addEventListener('click', function () {
        message.querySelector('.error__button').remove();
      });
    }
  };
})();
