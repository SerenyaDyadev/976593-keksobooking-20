'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.effect = {
    error: function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
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
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var success = successTemplate.cloneNode(true);

      document.body.appendChild(success);

      success.addEventListener('click', function () {
        success.remove();
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          success.remove();
        }
      });
    },
  };
})();
