'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var filterForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var placeholderInputPriceDefault = adForm.querySelector('#price').placeholder;
  var pinCircleDefaultLocalX = mapPinMain.style.left;
  var pinCircleDefaultLocalY = mapPinMain.style.top;
  var avatarPhotoDefault = document.querySelector('.ad-form-header__preview').querySelector('img');
  var avatarPhotoDefaultSrc = avatarPhotoDefault.src;
  var previewPhoto = document.querySelector('.ad-form__photo');

  window.clear = function () {
    adForm.querySelector('#price').placeholder = placeholderInputPriceDefault;

    window.utils.closePopupCard();
    window.utils.deletePins();

    avatarPhotoDefault.src = avatarPhotoDefaultSrc;

    var previewPhotoImages = previewPhoto.querySelectorAll('img');
    if (previewPhotoImages.length > 0) {
      previewPhotoImages.forEach(function (previewPhotoImg) {
        previewPhotoImg.parentNode.removeChild(previewPhotoImg);
      });
    }

    mapPinMain.style.left = pinCircleDefaultLocalX;
    mapPinMain.style.top = pinCircleDefaultLocalY;

    window.map.classList.add('map--faded');
    adForm.reset();
    filterForm.reset();
    adForm.classList.add('ad-form--disabled');
  };
})();
