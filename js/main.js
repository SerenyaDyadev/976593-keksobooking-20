'use strict';
var ENTER_KEYCODE = 13;

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

// console.log(document.querySelectorAll('.map__pin'));
// console.log(document.querySelectorAll('.map__pin')[1].offsetHeight);

var mapPinMain = document.querySelector('.map__pin--main');
var mapCircleCenterX = +(mapPinMain.style.left).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapCircleCenterY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapPinLocationX = mapCircleCenterX;
var mapPinLocationY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_HEIGHT;

window.utils.disableInputs();
window.utils.setAddressInputValue(mapCircleCenterX, mapCircleCenterY);

var loadPins;
var features = [];

var filter = document.querySelector('.map__filters');

filter.addEventListener('change', window.debounce(function (evt) {

  if (evt.target.checked) {
    features.push(evt.target.value);
  } else {
    features.splice(features.indexOf(evt.target.value), 1);
  }

  window.filters.updateData(loadPins, features);
}));

var onLoadData = function (data) {
  loadPins = data;
  window.filters.updateData(loadPins, features);
  window.utils.setAddressInputValue(mapPinLocationX, mapPinLocationY);
};

var onResetForm = function () {
  window.utils.disableInputs();
  window.clear();
  window.utils.setAddressInputValue(mapCircleCenterX, mapCircleCenterY);
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

  if (evt.keyCode === ENTER_KEYCODE) {
    activeMode();
  }
});

var avatarChooser = document.querySelector('.ad-form-header__input');
var previewAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');

window.photo(avatarChooser, previewAvatar);

var photoAdForm = document.querySelector('.ad-form__input');
var previewPhoto = document.querySelector('.ad-form__photo');

window.photo(photoAdForm, previewPhoto);

var adForm = document.querySelector('.ad-form');
var successMessage = document.querySelector('#success').content.querySelector('.success');

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

