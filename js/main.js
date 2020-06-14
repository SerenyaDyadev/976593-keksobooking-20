'use strict';


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

var MAP_PIN_WIDTH = 62;
var MAP_PIN_HEIGHT = 80;

var mapBooking = document.querySelector('.map');

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
  var x = getRandomQuantity(X_RANGE_MIN, X_RANGE_MAX) - WIDTH_PIN / 2;
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
// Вставка Объектов пинов на карту //

// var mapBooking = document.querySelector('.map');
// mapBooking.classList.remove('map--faded');
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

// Вставка карточек с описанием для пинов //

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = document.querySelector('.map__filters-container');

var accommodationTypes = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var fragmentPhoto = document.createDocumentFragment();

var getPhotoSrc = function (photos) {
  for (i = 0; i < photos.length; i++) {
    var photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = photos[i];
    fragmentPhoto.appendChild(photoElement);
  }

  return fragmentPhoto;
};

var fragmentWithFeatures = document.createDocumentFragment();

var getFeatures = function (features) {
  var listFeauters = cardTemplate.querySelector('.popup__features').cloneNode(false);

  for (i = 0; i < features.length; i++) {
    var listElement = document.createElement('li');
    listElement.className = 'popup__feature popup__feature--' + features[i];
    listFeauters.appendChild(listElement);
  }

  fragmentWithFeatures.appendChild(listFeauters);

  return fragmentWithFeatures;
};

var getCard = function (data) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;
  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = accommodationTypes[data.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до  ' + data.offer.checkout;
  cardElement.removeChild(cardElement.querySelector('.popup__features'));
  cardElement.insertBefore(getFeatures(data.offer.features), cardElement.querySelector('.popup__description'));
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  cardElement.querySelector('.popup__photos').replaceChild(getPhotoSrc(data.offer.photos), cardElement.querySelector('.popup__photo'));

  return cardElement;
};

// mapBooking.insertBefore(getCard(arrayData[0]), filtersContainer);


// module4-task2

var mapPinMain = document.querySelector('.map__pin--main');
var addForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var mapCircleCenterX = +(mapPinMain.style.left).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapCircleCenterY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_WIDTH / 2;
var mapPinLocationX = mapCircleCenterX;
var mapPinLocationY = +(mapPinMain.style.top).split('px')[0] + MAP_PIN_HEIGHT;

var inputAddress = addForm.querySelector('#address');
inputAddress.value = mapCircleCenterX + ', ' + mapCircleCenterY;

var addDisabledAttribute = function (elements) {
  for (i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

var removeDisabledAttribute = function (elements) {
  for (i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
};

addDisabledAttribute(addForm.querySelectorAll('select, fieldset'));
addDisabledAttribute(mapFilters.querySelectorAll('select, fieldset'));

var capacityRooms = addForm.rooms;
var capacityGuests = addForm.capacity;

var optionsEnable = function () {
  for (var j = capacityGuests.selectedIndex; j < capacityGuests.length - 1; j++) {
    capacityGuests.options[j].disabled = false;
  }
};

var validationRoomsGuests = function () {
  addDisabledAttribute(capacityGuests);

  if (capacityRooms[capacityRooms.selectedIndex].value === '100') {
    capacityGuests.options[capacityGuests.length - 1].selected = true;
    capacityGuests.options[capacityGuests.length - 1].disabled = false;
  } else {
    for (i = 0; i < capacityGuests.length; i++) {
      if (capacityRooms[capacityRooms.selectedIndex].value === capacityGuests.options[i].value) {
        capacityGuests.options[i].selected = true;
        optionsEnable();
      }
    }
  }
};

var activeMode = function () {
  mapBooking.appendChild(fragmentMapPin);
  mapBooking.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');
  removeDisabledAttribute(addForm.querySelectorAll('select, fieldset'));
  removeDisabledAttribute(mapFilters.querySelectorAll('select, fieldset'));
  inputAddress.value = mapPinLocationX + ', ' + mapPinLocationY;
  validationRoomsGuests();
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

capacityRooms.addEventListener('change', function () {
  validationRoomsGuests();
});


// module4-task3
// var mapPins = mapBooking.querySelectorAll('.map__pin');
// console.log(mapPins);

var searchNeedArrayData = function (atr) {
  for (i = 0; i < arrayData.length; i++) {
    if (arrayData[i].author.avatar === atr) {
      var index = i;
    }
  }
  return index;
};

var closeCard = function () {
  var article = mapBooking.querySelector('.map__card');
  article.parentNode.removeChild(article);
  mapBooking.removeEventListener('keydown', onClosePopupEsc);
};

var onClosePopup = function (evt) {
  if (evt.target.className === 'popup__close') {
    closeCard();
  }
};

var onClosePopupEsc = function (evt) {
  if (evt.key === 'Escape') {
    closeCard();
  }
};

var openCard = function (evt) {
  if (evt.target.alt !== 'Метка объявления' && evt.target.tagName === 'IMG') {
    // Сделайте так, чтобы одновременно могла быть открыта только одна карточка объявления.
    if (mapBooking.querySelectorAll('.map__card').length === 1) {
      closeCard();
    }

    var srcImgAuthor = evt.target.attributes[0].textContent;
    mapBooking.insertBefore(getCard(arrayData[searchNeedArrayData(srcImgAuthor)]), filtersContainer);
  }

  if (evt.target.className === 'map__pin') {
    // Сделайте так, чтобы одновременно могла быть открыта только одна карточка объявления.
    if (mapBooking.querySelectorAll('.map__card').length === 1) {
      closeCard();
    }

    var srcChildrenImgAuthor = evt.target.children[0].attributes[0].textContent;
    mapBooking.insertBefore(getCard(arrayData[searchNeedArrayData(srcChildrenImgAuthor)]), filtersContainer);
  }

  mapBooking.addEventListener('keydown', onClosePopupEsc);

  mapBooking.addEventListener('click', onClosePopup);
};

mapBooking.addEventListener('click', function (evt) {
  evt.preventDefault();
  openCard(evt);
});

mapBooking.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    openCard(evt);
  }
});
