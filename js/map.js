'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var mapBooking = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  var searchNeedArrayData = function (atr) {
    for (var i = 0; i < window.arrayData.length; i++) {
      if (window.arrayData[i].author.avatar === atr) {
        var index = i;
      }
    }
    return index;
  };

  var closeCard = function () {
    window.utils.closePopupCard();
    mapBooking.removeEventListener('keydown', onClosePopupEsc);
    mapBooking.removeEventListener('keydown', onClosePopup);
  };

  var onClosePopup = function (evt) {
    if (evt.target.className === 'popup__close') {
      closeCard();
    }
  };

  var onClosePopupEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  var openCard = function (evt) {
    if (evt.target.alt !== 'Метка объявления' && evt.target.tagName === 'IMG' && evt.target.className !== 'popup__photo') {
      if (mapBooking.querySelectorAll('.map__card').length === 1) {
        closeCard();
      }

      var srcImgAuthor = evt.target.attributes[0].textContent;
      mapBooking.insertBefore(window.card(window.arrayData[searchNeedArrayData(srcImgAuthor)]), filtersContainer);
    }

    if (evt.target.className === 'map__pin') {
      if (mapBooking.querySelectorAll('.map__card').length === 1) {
        closeCard();
      }

      var srcChildrenImgAuthor = evt.target.children[0].attributes[0].textContent;
      mapBooking.insertBefore(window.card(window.arrayData[searchNeedArrayData(srcChildrenImgAuthor)]), filtersContainer);
    }

    mapBooking.addEventListener('keydown', onClosePopupEsc);

    mapBooking.addEventListener('click', onClosePopup);
  };

  mapBooking.addEventListener('click', function (evt) {

    openCard(evt);
  });

  mapBooking.addEventListener('keydown', function (evt) {

    if (evt.keyCode === ENTER_KEYCODE) {
      openCard(evt);
    }
  });

  window.map = mapBooking;

})();
