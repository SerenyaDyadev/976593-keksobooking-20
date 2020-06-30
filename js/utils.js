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

  };

})();
