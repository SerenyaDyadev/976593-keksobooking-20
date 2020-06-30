'use strict';
(function () {
  var MAX_PIN_COUNT = 5;


  window.render = function (data) {
    window.utils.deletePins();

    var fragmentMapPin = document.createDocumentFragment();
    var takeNumber = data.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      fragmentMapPin.appendChild(window.pin(data[i]));
    }

    window.map.appendChild(fragmentMapPin);
    window.map.classList.remove('map--faded');
    window.form();

    window.arrayData = data;
  };
})();
