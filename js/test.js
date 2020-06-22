'use strict';
var MAP_PIN_WIDTH = 62;
var MAP_PIN_HEIGHT = 80;
var mapPinMain = document.querySelector('.map__pin--main');
var mapCircleCenterX = +(mapPinMain.style.left).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapCircleCenterY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapPinLocationY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_HEIGHT;
var inputAddress = document.querySelector('#address');
var fragmentMapPin = document.createDocumentFragment();


for (var i = 0; i < window.data.length; i++) {
  fragmentMapPin.appendChild(window.pin(window.data[i]));
}

var activeMode = function () {
  window.map.appendChild(fragmentMapPin);
  window.map.classList.remove('map--faded');
  window.form();
  inputAddress.value = mapCircleCenterX + ', ' + mapPinLocationY;
  // window.move.inputAddress;
};

inputAddress.value = mapCircleCenterX + ', ' + mapCircleCenterY;

mapPinMain.addEventListener('mousedown', function (evt) {
  // console.log(evt.clientX);
  // console.log(evt.clientY);
  if (evt.button === 0) {
    activeMode();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {

  if (evt.key === 'Enter') {
    activeMode();
  }
});
