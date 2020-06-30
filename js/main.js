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

// var accommodationTypes = {
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец'
// };

var updateData = function () {
  // console.log(loadPins);
  // console.log(housingType[housingType.selectedIndex].value);
  // console.log(loadPins[0].offer.type);
  if (housingType[housingType.selectedIndex].value !== 'any') {
    var newData = loadPins.filter(function (it) {
      // console.log(it.offer.type);
      // console.log(housingType[housingType.selectedIndex].value);
      // console.log(it.offer.type === housingType[housingType.selectedIndex].value);
      return it.offer.type === housingType[housingType.selectedIndex].value;
    });
  } else {
    newData = loadPins;
  }
  // console.log(newData);
  window.render(newData);
};

var housingType = document.querySelector('#housing-type');

housingType.addEventListener('change', function () {
  updateData();
});

var onLoadData = function (data) {
  loadPins = data;
  updateData();
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

