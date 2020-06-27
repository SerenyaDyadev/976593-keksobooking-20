'use strict';
(function () {
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 1000;

  window.load = function (URL, action, onLoad, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(action, URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        window.effect(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      window.effect(errorMessage);
    });
    xhr.addEventListener('timeout', function () {
      window.effect(errorMessage);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send(data);
  };
})();

