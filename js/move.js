'use strict';

(function () {
  var X_RANGE_MIN = 0;
  var X_RANGE_MAX = 1200;
  var Y_RANGE_MIN = 130;
  var Y_RANGE_MAX = 630;

  var mapPinMain = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      var mapPinLocationX = mapPinMain.offsetLeft + window.fixed.MAP_PIN_WIDTH / 2;
      var mapPinLocationY = mapPinMain.offsetTop + window.fixed.MAP_PIN_HEIGHT;

      if (mapPinLocationX < X_RANGE_MIN) {
        mapPinMain.style.left = X_RANGE_MIN - window.fixed.MAP_PIN_WIDTH / 2 + 'px';
        mapPinLocationX = X_RANGE_MIN;
      } else if (mapPinLocationX > X_RANGE_MAX) {
        mapPinMain.style.left = X_RANGE_MAX - window.fixed.MAP_PIN_WIDTH / 2 + 'px';
        mapPinLocationX = X_RANGE_MAX;
      }

      if (mapPinLocationY < Y_RANGE_MIN) {
        mapPinMain.style.top = Y_RANGE_MIN - window.fixed.MAP_PIN_HEIGHT + 'px';
        mapPinLocationY = Y_RANGE_MIN;
      } else if (mapPinLocationY > Y_RANGE_MAX) {
        mapPinMain.style.top = Y_RANGE_MAX - window.fixed.MAP_PIN_HEIGHT + 'px';
        mapPinLocationY = Y_RANGE_MAX;
      }

      inputAddress.value = mapPinLocationX + ', ' + mapPinLocationY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
