'use strict';

var RUNDOM_QUANTITY = 5;
//для количества людей и комнат

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

var getRundomQuantity = function (number) {
  var qrt = Math.round(Math.random() * number)
  if (qrt === 0) {
    qrt = 1
  }

  return qrt;
}

var getRundomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
}

var getAvatarSource = function (array) {
  var qty = getRundomArrayElement(array);
  var index = array.indexOf(qty);
  if (index == -1) {
    getAvatarSource(array);
  } else {
    array.splice(index, 1);

    return 'img/avatars/user' + '/0' + qty + '.png';
  }
}

var getRandomString = function (array) {
  var stringLength = Math.round(Math.random() * array.length);
  if (stringLength === 0) {
    var string = array[0];
  } else {
    var string = array.slice(0, stringLength).join(' ');
  };

  return string;
}

var getRundomLocation = function (min, max) {
  return Math.floor(Math.random() * (max - min));
}

var getObject = function () {
  var x = getRundomLocation(X_RANGE_MIN, X_RANGE_MAX);
  var y = getRundomLocation(Y_RANGE_MIN, Y_RANGE_MAX);

  var newObject = {
    author: {
      avatar: getAvatarSource(NUMBERS),
    },
    offer: {
      title: 'Заголовок',
      address: x + ', ' + y,
      price: '100 руб.',
      type: getRundomArrayElement(PLACES),
      rooms: getRundomQuantity(RUNDOM_QUANTITY),
      guests: getRundomQuantity(RUNDOM_QUANTITY),
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
  }

  return newObject;
}

var getObjectsToArray = function (numberObjects) {
  var array = [];
  for (var i = 0; i < numberObjects; i++) {
    array.push(getObject());
  }

  return array;
}

var arrayTask = getObjectsToArray(NUMBER_OBJECTS);

console.log(arrayTask);
document.querySelector('.map').classList.remove('map--faded');
