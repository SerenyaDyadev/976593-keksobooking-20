'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var fragmentPhoto = document.createDocumentFragment();
  var fragmentWithFeatures = document.createDocumentFragment();

  var accommodationTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var getFeatures = function (features) {
    var listFeauters = cardTemplate.querySelector('.popup__features').cloneNode(false);

    features.forEach(function (feature) {
      var listElement = document.createElement('li');
      listElement.className = 'popup__feature popup__feature--' + feature;
      listFeauters.appendChild(listElement);
    });

    fragmentWithFeatures.appendChild(listFeauters);

    return fragmentWithFeatures;
  };

  var getPhotoSrc = function (photos) {
    photos.forEach(function (photo) {
      var photoElement = cardTemplate.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photo;
      fragmentPhoto.appendChild(photoElement);
    });

    return fragmentPhoto;
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

  window.card = getCard;
})();
