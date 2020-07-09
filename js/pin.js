'use strict';

(function () {

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPin = function (data) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.style.left = data.location.x - window.fixed.MAP_PIN_WIDTH / 2 + 'px';
    pinElement.style.top = data.location.y - window.fixed.MAP_PIN_HEIGHT + 'px';

    return pinElement;
  };

  window.pin = renderPin;
})();
