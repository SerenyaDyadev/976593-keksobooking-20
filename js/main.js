'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
var MAP_PIN_WIDTH = 62;
var MAP_PIN_HEIGHT = 80;
var mapCircleCenterX = +(mapPinMain.style.left).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapCircleCenterY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapPinLocationX = mapCircleCenterX;
var mapPinLocationY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_HEIGHT;
var successMessage = document.querySelector('#success').content.querySelector('.success');

window.utils.disableInputs();
window.utils.addressInputValue(mapCircleCenterX, mapCircleCenterY);

var loadPins;

var updateData = function () {
  var newData = loadPins;

  if (housingType[housingType.selectedIndex].value !== 'any') {
    newData = loadPins.filter(function (it) {
      return it.offer.type === housingType[housingType.selectedIndex].value;
    });
  }

  window.render(newData);
};

var housingType = document.querySelector('#housing-type');

housingType.addEventListener('change', function () {
  updateData();
});

var onLoadData = function (data) {
  loadPins = data;
  updateData(loadPins);
  window.utils.addressInputValue(mapPinLocationX, mapPinLocationY);
};

var onResetForm = function () {
  window.utils.disableInputs();
  window.clear();
  window.utils.addressInputValue(mapCircleCenterX, mapCircleCenterY);
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
    onResetForm();
    window.effect(successMessage);
  }, new FormData(adForm));
  evt.preventDefault();
});


var formResetButton = adForm.querySelector('.ad-form__reset');
formResetButton.addEventListener('click', function () {
  onResetForm();
});

