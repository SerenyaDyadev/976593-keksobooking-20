'use strict';

(function () {
  var X_RANGE_MIN = 0;
  var X_RANGE_MAX = 1200;
  var Y_RANGE_MIN = 130;
  var Y_RANGE_MAX = 630;
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_HEIGHT = 80;
  var mapPinMain = document.querySelector('.map__pin--main');
  // var mapCircleCenterX = +(mapPinMain.style.left).split('px')[0] + MAP_PIN_WIDTH / 2;
  // var mapCircleCenterY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_WIDTH / 2;
  var mapPinLocationX;
  var mapPinLocationY;
  var inputAddress = document.querySelector('#address');


  var locationX;
  var locationY;


  // inputAddress.value = mapCircleCenterX + ', ' + mapCircleCenterY;

  // console.log(inputAddress.value);


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

      locationX = mapPinMain.offsetLeft - shift.x + MAP_PIN_WIDTH / 2;
      console.log(mapPinMain.style.left + ' mapPinMain.style.left');

      console.log(+(mapPinMain.style.top).split('px')[0]);

      locationY = mapPinMain.offsetTop - shift.y + MAP_PIN_HEIGHT;
      console.log(mapPinMain.style.top + ' mapPinMain.style.top');

      inputAddress.value = mapPinLocationX + ', ' + mapPinLocationY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (+(mapPinMain.style.left).split('px')[0] >= X_RANGE_MIN || +(mapPinMain.style.left).split('px')[0] <= X_RANGE_MAX) {
        mapPinLocationX = locationX;
      } else if (+(mapPinMain.style.left).split('px')[0] < X_RANGE_MIN) {
        mapPinMain.style.left = X_RANGE_MIN - MAP_PIN_WIDTH / 2 + 'px';
        mapPinLocationX = X_RANGE_MIN;
      } else if (locationX > X_RANGE_MAX) {
        mapPinMain.style.left = X_RANGE_MIN - MAP_PIN_WIDTH / 2 + 'px';
        mapPinLocationX = X_RANGE_MAX;
      }

      if (+(mapPinMain.style.top).split('px')[0] >= Y_RANGE_MIN || +(mapPinMain.style.top).split('px')[0] <= Y_RANGE_MAX) {
        mapPinLocationY = locationY;
      } else if (+(mapPinMain.style.top).split('px')[0] < Y_RANGE_MIN) {
        mapPinMain.style.top = Y_RANGE_MIN - MAP_PIN_HEIGHT + 'px';
        mapPinLocationY = Y_RANGE_MIN;
      } else if (+(mapPinMain.style.top).split('px')[0] > Y_RANGE_MAX) {
        mapPinMain.style.top = Y_RANGE_MAX - MAP_PIN_HEIGHT + 'px';
        mapPinLocationY = Y_RANGE_MAX;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // window.move = {
  //   inputAddress: inputAddress.value,
  // }

})();
