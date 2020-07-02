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

var priceType = {
  'low': 10000,
  'high': 50000,
};

var updateData = function () {
  // console.log(loadPins);
  var typeData = loadPins;

  if (housingType[housingType.selectedIndex].value !== 'any') {
    typeData = loadPins.filter(function (it) {
      return it.offer.type === housingType[housingType.selectedIndex].value;
    });
  }

  // console.log(typeData);

  var priceData = typeData;

  if (housingPrice[housingPrice.selectedIndex].value !== 'any') {
    priceData = typeData.filter(function (it) {
      if (housingPrice[housingPrice.selectedIndex].value === 'low') {
        return it.offer.price < priceType['low'];
      } else if (housingPrice[housingPrice.selectedIndex].value === 'high') {
        return it.offer.price > priceType['high'];
      } else if (housingPrice[housingPrice.selectedIndex].value === 'middle') {
        return (it.offer.price >= priceType['low'] && it.offer.price <= priceType['high']);
      }
    });
  }


  // console.log(priceData);

  var roomsData = priceData;

  if (housingRooms[housingRooms.selectedIndex].value !== 'any') {
    roomsData = priceData.filter(function (it) {
      return String(it.offer.rooms) === housingRooms[housingRooms.selectedIndex].value;
    });
  }

  // console.log(roomsData);
  // console.log('roomsData');

  var guestsData = roomsData;

  if (housingGuests[housingGuests.selectedIndex].value !== 'any') {
    guestsData = roomsData.filter(function (it) {
      return String(it.offer.guests) === housingGuests[housingGuests.selectedIndex].value;
    });
  }

  // console.log(guestsData);
  // console.log('guestsData');

  var featuresData = guestsData;

  // if (features.length !== 0) {
  //   for (var i = 0; i < features.length; i++) {
  //     featuresData = guestsData.filter(function (it) {
  //       return it.offer.features.indexOf(features[i]) !== -1;
  //     });
  //   }
  // }


  if (features.length !== 0) {
    featuresData = guestsData.filter(function (it) {
      for (var i = 0; i < features.length; i++) {
        var index = 0;
        if (it.offer.features.indexOf(features[i]) === -1) {
          index++;
          break;
        }
        console.log(it.offer.features);
        console.log(features[i]);
        console.log(index);
      }
      return index === 0;
    });
  }

  console.log(featuresData);
  console.log('featuresData');


  window.render(featuresData);
};

var housingType = document.querySelector('#housing-type');


housingType.addEventListener('change', function () {
  updateData();
});

var housingPrice = document.querySelector('#housing-price');

housingPrice.addEventListener('change', function () {
  updateData();
});

var housingRooms = document.querySelector('#housing-rooms');

housingRooms.addEventListener('change', function () {
  updateData();
});

var housingGuests = document.querySelector('#housing-guests');

housingGuests.addEventListener('change', function () {
  updateData();
});

var housingFeatures = document.querySelector('#housing-features');

var features = [];

housingFeatures.addEventListener('change', function (evt) {

  if (evt.target.checked) {
    features.push(evt.target.value);
  } else {
    features.splice(features.indexOf(evt.target.value), 1);
  }

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

