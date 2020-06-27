'use strict';

(function () {
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
    var article = mapBooking.querySelector('.map__card');
    article.parentNode.removeChild(article);
    mapBooking.removeEventListener('keydown', onClosePopupEsc);
    mapBooking.removeEventListener('keydown', onClosePopup);
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
    if (evt.target.alt !== 'Метка объявления' && evt.target.tagName === 'IMG' && evt.target.className !== 'popup__photo') {
      // Сделайте так, чтобы одновременно могла быть открыта только одна карточка объявления.
      if (mapBooking.querySelectorAll('.map__card').length === 1) {
        closeCard();
      }

      var srcImgAuthor = evt.target.attributes[0].textContent;
      mapBooking.insertBefore(window.card(window.arrayData[searchNeedArrayData(srcImgAuthor)]), filtersContainer);
    }

    if (evt.target.className === 'map__pin') {
      // Сделайте так, чтобы одновременно могла быть открыта только одна карточка объявления.
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
    evt.preventDefault();
    openCard(evt);
  });

  mapBooking.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      openCard(evt);
    }
  });

  window.map = mapBooking;

})();
