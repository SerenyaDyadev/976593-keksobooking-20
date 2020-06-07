'use strict';

var MIN_ROOM_NUMBER = 0;
var MAX_ROOM_NUMBER = 4;
var MIN_GUEST_NUMBER = 1;
var MAX_GUEST_NUMBER = 5;

var X_RANGE_MIN = 0;
var X_RANGE_MAX = 1200;
var Y_RANGE_MIN = 130;
var Y_RANGE_MAX = 630;

var TYPE_PLACES = ['palace', 'flat', 'house', 'bungalo'];
var IN_OUT_TIMES = ['12:00', '13:00', '14:00'];
var OBJECT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OBJECT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var NUMBER_OBJECTS = 8;

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomStrings = function (array) {
  var length = Math.round(Math.random() * array.length);
  var arr;
  if (length === 0) {
    arr = array[0];
  } else {
    arr = array.slice(0, length);
  }

  return arr;
};

var getRandomQuantity = function (min, max) {
  if (!min) {
    min = 0;
  }

  return Math.round(min + Math.random() * (max - min));
};

var getObject = function (number) {
  var x = getRandomQuantity(X_RANGE_MIN, X_RANGE_MAX);
  var y = getRandomQuantity(Y_RANGE_MIN, Y_RANGE_MAX);

  var newObject = {
    author: {
      avatar: 'img/avatars/user' + '0' + number + '.png',
    },
    offer: {
      title: 'Заголовок',
      address: x + ', ' + y,
      price: '100',
      type: getRandomElement(TYPE_PLACES),
      rooms: getRandomQuantity(MIN_ROOM_NUMBER, MAX_ROOM_NUMBER),
      guests: getRandomQuantity(MIN_GUEST_NUMBER, MAX_GUEST_NUMBER),
      checkin: getRandomElement(IN_OUT_TIMES),
      checkout: getRandomElement(IN_OUT_TIMES),
      features: getRandomStrings(OBJECT_FEATURES),
      description: 'Описание',
      photos: getRandomStrings(OBJECT_PHOTOS),
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
    array.push(getObject(i + 1));
  }

  return array;
};

var arrayData = getObjectsToArray(NUMBER_OBJECTS);
// Вставка Объектов пинов на карту //

var mapBooking = document.querySelector('.map');
mapBooking.classList.remove('map--faded');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentMapPin = document.createDocumentFragment();

var renderPin = function (data) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  pinElement.style.left = data.location.x + 'px';
  pinElement.style.top = data.location.y + 'px';

  return pinElement;
};

for (var i = 0; i < arrayData.length; i++) {
  fragmentMapPin.appendChild(renderPin(arrayData[i]));
}

mapBooking.appendChild(fragmentMapPin);

/*

// Вставка карточек с описанием для пинов //

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var filtersContainer = document.querySelector('.map__filters-container');
// console.log(arrayData[0].offer.features);

var fragmentFeature = document.createDocumentFragment();
var popupFeatures = cardTemplate.querySelector('.popup__features');
var popupFeatureWifi = popupFeatures.querySelector('popup__feature--wifi');
var popupFeatureDishwasher = popupFeatures.querySelector('popup__feature--dishwasher');
var popupFeatureParking = popupFeatures.querySelector('popup__feature--parking');
var popupFeatureWasher = popupFeatures.querySelector('popup__feature--washer');
var popupFeatureElevator = popupFeatures.querySelector('popup__feature--elevator');
var popupFeatureConditioner = popupFeatures.querySelector('popup__feature--conditioner');

console.log(popupFeatures.length);

// fragmentMapPin.appendChild(<li class= "popup__feature popup__feature--wifi"></li>);
var getPopupFeatures = function (arr) {

  popupFeatures.appendChild(popupFeatureWifi);
  if (arr.length > 1) {
  // for (var i = 1; i < arr.length; i ++) {
  //   // if [arr]
    console.log(arr[1]);
  // // console.log(arr.length);
  }

  return
};

getPopupFeatures(arrayData[0].offer.features);
  // console.log(getPopupFeatures(arrayData[0].offer.features));

var getPopupType = function (number) {
  var type = '';
  if (number === 'flat') {
    type = 'Квартира';
  } else if (number === 'bungalo') {
    type = 'Бунгало';
  } else if (number === 'house') {
    type = 'Дом';
  } else if (number === 'palace') {
    type = 'Дворец';
  }
  /*
  else {
    type = 'Во дворце дом квартирный, а рядом бунгало';
  }

  return type;
};

var cardElement = cardTemplate.cloneNode(true);
cardElement.querySelector('.popup__title').textContent = arrayData[0].offer.title;
cardElement.querySelector('.popup__text--address').textContent = arrayData[0].offer.address;
cardElement.querySelector('.popup__text--price').textContent = arrayData[0].offer.price + '₽/ночь';
cardElement.querySelector('.popup__type').textContent = getPopupType(arrayData[0].offer.type);
cardElement.querySelector('.popup__text--capacity').textContent = arrayData[0].offer.rooms + ' комнаты для ' + arrayData[0].offer.guests + ' гостей';
cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayData[0].offer.checkin + ', выезд до  ' + arrayData[0].offer.checkout;
// cardElement.querySelector('.popup__features').appendChild.getPopupFeatures(arrayData[0].offer.features);
// console.log(cardElement.querySelector('.popup__features'));
// popupFeatures.appendChild(fragmentFeature);

// console.log(cardElement);

mapBooking.insertBefore(cardElement, filtersContainer);

*/
