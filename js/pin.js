'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPin = function (data) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.style.left = data.location.x + 'px';
    pinElement.style.top = data.location.y + 'px';

    return pinElement;
  };

  window.pin = renderPin;
})();
