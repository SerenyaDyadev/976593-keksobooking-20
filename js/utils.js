'use strict';
(function () {
  var inputs = document.querySelectorAll('select, fieldset');

  window.utils = {

    disableInputs: function () {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
      }
    },

    addressInputValue: function (x, y) {
      document.querySelector('#address').value = x + ', ' + y;
    },

    deletePins: function () {
      var pins = document.querySelectorAll('.map__pin');
      for (var i = 1; i < pins.length; i++) {
        pins[i].remove();
      }
    },

    closePopupCard: function () {
      var popup = document.querySelector('.map__card');
      if (document.querySelector('.map__card')) {
        popup.parentNode.removeChild(popup);
      }
    }
  };

})();
