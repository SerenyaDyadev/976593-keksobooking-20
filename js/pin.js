'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPin = function (data) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.style.left = data.location.x - MAP_PIN_WIDTH / 2 + 'px';
    pinElement.style.top = data.location.y - MAP_PIN_HEIGHT + 'px';

    return pinElement;
  };

  window.pin = renderPin;
})();
