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
/*
  window.effect = {
    error: function () {
      var errorMessage = errorTemplate.cloneNode(true);

      document.body.appendChild(errorMessage);

      var errorButton = errorMessage.querySelector('.error__button');

      document.addEventListener('click', function () {
        errorMessage.remove();
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          errorMessage.remove();
        }
      });

      errorButton.addEventListener('click', function () {
        errorMessage.remove();
      });
    },

    success: function () {

      var successMessage = successTemplate.cloneNode(true);

      document.body.appendChild(successMessage);

      successMessage.addEventListener('click', function () {
        successMessage.remove();
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          successMessage.remove();
        }
      });
    },
  };
  */
})();
