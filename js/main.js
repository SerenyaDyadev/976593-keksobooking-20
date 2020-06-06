'use strict';

var NUMBER_GUESTS = 2;
var NUMBER_ROOMS = 3;
// для количества людей и комнат

var X_RANGE_MIN = 0;
var X_RANGE_MAX = 1200;
var Y_RANGE_MIN = 130;
var Y_RANGE_MAX = 630;
// Значение ограничено размерами блока, в котором перетаскивается метка. Откуда и как брать ограничения? Взял из ширины body

var NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

var PLACES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var WORDS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var SOURCES = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var NUMBER_OBJECTS = 8;

// если не для гостей, то надо дать возможность выпадать нулю - 0 ?
var getRundomQuantity = function (number) {
  var qrt = Math.round(Math.random() * number);
  if (qrt === 0) {
    qrt = 1;
  }

  return qrt;
};

var getRundomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getSource = function (array) {
  var qty = getRundomArrayElement(array);
  var index = array.indexOf(qty);
  if (index === -1) {
    getSource();
  } else {
    array.splice(index, 1);
    var src = 'img/avatars/user' + '0' + qty + '.png';
  }

  return src;
};

var getRandomStrings = function (array) {
  var length = Math.round(Math.random() * array.length);
  var strings;
  if (length === 0) {
    strings = array[0];
  } else {
    strings = array.slice(0, length);
  }

  return strings;
};

var getRundomLocation = function (min, max) {
  return Math.floor(Math.random() * (max - min));
};

var getObject = function () {
  var x = getRundomLocation(X_RANGE_MIN, X_RANGE_MAX);
  var y = getRundomLocation(Y_RANGE_MIN, Y_RANGE_MAX);

  var newObject = {
    author: {
      avatar: getSource(NUMBERS),
    },
    offer: {
      title: 'Заголовок',
      address: x + ', ' + y,
      price: '100',
      type: getRundomArrayElement(PLACES),
      rooms: getRundomQuantity(NUMBER_ROOMS),
      guests: getRundomQuantity(NUMBER_GUESTS),
      checkin: getRundomArrayElement(TIMES),
      checkout: getRundomArrayElement(TIMES),
      features: getRandomStrings(WORDS),
      description: 'Описание',
      photos: getRandomStrings(SOURCES),
    },
    location: {
      x: x,
      y: y
    }
  };

  return newObject;
};

var getObjectsToArray = function (numberObjects) {
  var array = [];
  for (var i = 0; i < numberObjects; i++) {
    array.push(getObject());
  }

  return array;
};

var arrayData = getObjectsToArray(NUMBER_OBJECTS);

// Вставка Объектов пинов на карту //


var renderPin = function (wizard) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = wizard.author.avatar;
  pinElement.querySelector('img').alt = wizard.offer.title;
  pinElement.style.left = wizard.location.x + 'px';
  pinElement.style.top = wizard.location.y + 'px';

  return pinElement;
};

for (var i = 0; i < arrayData.length; i++) {
  fragmentMapPin.appendChild(renderPin(arrayData[i]));
}

mapBooking.appendChild(fragmentMapPin);


// // Вставка карточек с описанием для пинов //

// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// var filtersContainer = document.querySelector('.map__filters-container');
// // console.log(arrayData[0].offer.features);

// var fragmentFeature = document.createDocumentFragment();
// var popupFeatures = cardTemplate.querySelector('.popup__features');
// var popupFeatureWifi = popupFeatures.querySelector('popup__feature--wifi');
// var popupFeatureDishwasher = popupFeatures.querySelector('popup__feature--dishwasher');
// var popupFeatureParking = popupFeatures.querySelector('popup__feature--parking');
// var popupFeatureWasher = popupFeatures.querySelector('popup__feature--washer');
// var popupFeatureElevator = popupFeatures.querySelector('popup__feature--elevator');
// var popupFeatureConditioner = popupFeatures.querySelector('popup__feature--conditioner');

// console.log(popupFeatures.length);

// // fragmentMapPin.appendChild(<li class= "popup__feature popup__feature--wifi"></li>);
// var getPopupFeatures = function (arr) {

//   popupFeatures.appendChild(popupFeatureWifi);
//   if (arr.length > 1) {
//   // for (var i = 1; i < arr.length; i ++) {
//   //   // if [arr]
//     console.log(arr[1]);
//   // // console.log(arr.length);
//   }

//   return popupFeatures
// };

// getPopupFeatures(arrayData[0].offer.features);
//   // console.log(getPopupFeatures(arrayData[0].offer.features));

// var getPopupType = function (number) {
//   var type = '';
//   if (number === 'flat') {
//     type = 'Квартира';
//   } else if (number === 'bungalo') {
//     type = 'Бунгало';
//   } else if (number === 'house') {
//     type = 'Дом';
//   } else if (number === 'palace') {
//     type = 'Дворец';
//   }
//   /*
//   else {
//     type = 'Во дворце дом квартирный, а рядом бунгало';
//   }
//   */
//   return type;
// };

// var cardElement = cardTemplate.cloneNode(true);
// cardElement.querySelector('.popup__title').textContent = arrayData[0].offer.title;
// cardElement.querySelector('.popup__text--address').textContent = arrayData[0].offer.address;
// cardElement.querySelector('.popup__text--price').textContent = arrayData[0].offer.price + '₽/ночь';
// cardElement.querySelector('.popup__type').textContent = getPopupType(arrayData[0].offer.type);
// cardElement.querySelector('.popup__text--capacity').textContent = arrayData[0].offer.rooms + ' комнаты для ' + arrayData[0].offer.guests + ' гостей';
// cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayData[0].offer.checkin + ', выезд до  ' + arrayData[0].offer.checkout;
// // cardElement.querySelector('.popup__features').appendChild.getPopupFeatures(arrayData[0].offer.features);
// // console.log(cardElement.querySelector('.popup__features'));
// // popupFeatures.appendChild(fragmentFeature);

// // console.log(cardElement);

// mapBooking.insertBefore(cardElement, filtersContainer);
