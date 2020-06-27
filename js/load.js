'use strict';
(function () {
  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 1000;

  var onError = function (errorMessage) {
    if (!document.querySelector('.error')) {
      var node = document.createElement('div');
      node.classList.add('error');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '50px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    } else {
      document.querySelector('.error').textContent = errorMessage;
    }
  };

  window.load = function (URL, action, onLoad, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(action, URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send(data);
  };
})();

