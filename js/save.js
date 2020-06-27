'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var pinCircleDefaultLocalX = mapPinMain.style.left;
  var pinCircleDefaultLocalY = mapPinMain.style.top;

  window.save = function () {
    var pins = document.querySelectorAll('.map__pin');

    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }

    mapPinMain.style.left = pinCircleDefaultLocalX;
    mapPinMain.style.top = pinCircleDefaultLocalY;

    window.map.classList.add('map--faded');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
  };
})();
