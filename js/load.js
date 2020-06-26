'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  window.load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.send();
  };
})();

