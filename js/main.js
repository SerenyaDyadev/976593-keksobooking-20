'use strict';

var fragmentMapPin = document.createDocumentFragment();
var mapPinMain = document.querySelector('.map__pin--main');
var MAP_PIN_WIDTH = 62;
var MAP_PIN_HEIGHT = 80;
var mapCircleCenterX = +(mapPinMain.style.left).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapCircleCenterY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapPinLocationX = mapCircleCenterX;
var mapPinLocationY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_HEIGHT;
// var addForm = document.querySelector('.ad-form');
// var mapFilters = document.querySelector('.map__filters');

var inputAddress = document.querySelector('#address');
inputAddress.value = mapCircleCenterX + ', ' + mapCircleCenterY;

for (var i = 0; i < window.data.length; i++) {
  fragmentMapPin.appendChild(window.pin(window.data[i]));
}

var activeMode = function () {
  window.map.appendChild(fragmentMapPin);
  window.map.classList.remove('map--faded');
  inputAddress.value = mapPinLocationX + ', ' + mapPinLocationY;
  window.form();
};

mapPinMain.addEventListener('mousedown', function (evt) {

  if (evt.button === 0) {
    activeMode();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {

  if (evt.key === 'Enter') {
    activeMode();
  }
});
