'use strict';

var fragmentMapPin = document.createDocumentFragment();
var mapPinMain = document.querySelector('.map__pin--main');
var MAP_PIN_WIDTH = 62;
var MAP_PIN_HEIGHT = 80;
var mapCircleCenterX = +(mapPinMain.style.left).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapCircleCenterY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapPinLocationX = mapCircleCenterX;
var mapPinLocationY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_HEIGHT;
var inputs = document.querySelectorAll('select, fieldset');
var successMessage = document.querySelector('#success').content.querySelector('.success');
var arrayData;

var disableInputs = function () {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
};

disableInputs();

var addressInputValue = function (x, y) {
  document.querySelector('#address').value = x + ', ' + y;
};

addressInputValue(mapCircleCenterX, mapCircleCenterY);

var onLoadData = function (data) {

  for (var i = 0; i < data.length; i++) {
    fragmentMapPin.appendChild(window.pin(data[i]));
  }

  window.map.appendChild(fragmentMapPin);
  window.map.classList.remove('map--faded');
  addressInputValue(mapPinLocationX, mapPinLocationY);
  window.form();

  arrayData = data;
  return arrayData;
};

var activeMode = function () {
  window.load('https://javascript.pages.academy/keksobooking/data', 'GET', onLoadData);
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


var adForm = document.querySelector('.ad-form');
adForm.addEventListener('submit', function (evt) {
  window.load('https://javascript.pages.academy/keksobooking', 'POST', function () {
    disableInputs();
    window.clear();
    addressInputValue(mapCircleCenterX, mapCircleCenterY);
    window.effect(successMessage);
  }, new FormData(adForm));
  evt.preventDefault();
});


var formResetButton = adForm.querySelector('.ad-form__reset');
formResetButton.addEventListener('click', function () {
  disableInputs();
  window.clear();
  addressInputValue(mapCircleCenterX, mapCircleCenterY);
});

