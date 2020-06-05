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
    getSource(array);
  } else {
    array.splice(index, 1);
    var src = 'img/avatars/user' + '0' + qty + '.png';
  }

  return src;
};

var getRandomString = function (array) {
  var stringLength = Math.round(Math.random() * array.length);
  var string;
  if (stringLength === 0) {
    string = array[0];
  } else {
    string = array.slice(0, stringLength).join(' ');
  }

  return string;
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
      price: '100 руб.',
      type: getRundomArrayElement(PLACES),
      rooms: getRundomQuantity(NUMBER_ROOMS),
      guests: getRundomQuantity(NUMBER_GUESTS),
      checkin: getRundomArrayElement(TIMES),
      checkout: getRundomArrayElement(TIMES),
      features: getRandomString(WORDS),
      description: 'Описание',
      photos: getRandomString(SOURCES),
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

var mapBooking = document.querySelector('.map');
mapBooking.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var fragmentMapPin = document.createDocumentFragment();

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
