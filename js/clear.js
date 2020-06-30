'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var filterForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var pinCircleDefaultLocalX = mapPinMain.style.left;
  var pinCircleDefaultLocalY = mapPinMain.style.top;

  window.clear = function () {
    window.utils.closePopupCard();
    window.utils.deletePins();

    mapPinMain.style.left = pinCircleDefaultLocalX;
    mapPinMain.style.top = pinCircleDefaultLocalY;

    window.map.classList.add('map--faded');
    adForm.reset();
    filterForm.reset();
    adForm.classList.add('ad-form--disabled');
  };
})();
