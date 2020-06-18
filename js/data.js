'use strict';

(function () {
  var MIN_ROOM_NUMBER = 0;
  var MAX_ROOM_NUMBER = 4;
  var MIN_GUEST_NUMBER = 1;
  var MAX_GUEST_NUMBER = 5;

  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;
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

  var getRandomArray = function (array) {
    return array.slice(0, Math.round(Math.random() * array.length));
  };

  var makeRandomSortArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  var getRandomQuantity = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getObject = function (number) {
    var x = getRandomQuantity(X_RANGE_MIN + WIDTH_PIN / 2, X_RANGE_MAX) - WIDTH_PIN / 2;
    var y = getRandomQuantity(Y_RANGE_MIN, Y_RANGE_MAX) - HEIGHT_PIN;

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
        features: getRandomArray(OBJECT_FEATURES),
        description: 'Описание',
        photos: getRandomArray(makeRandomSortArray(OBJECT_PHOTOS)),
      },
      location: {
        x: x,
        y: y
      }
    };

    return newObject;
  };

  var getArrayObjects = function (number) {
    var array = [];
    for (var i = 0; i < number; i++) {
      array.push(getObject(i + 1));
    }

    return array;
  };

  var arrayData = getArrayObjects(NUMBER_OBJECTS);
  window.data = arrayData;
})();
