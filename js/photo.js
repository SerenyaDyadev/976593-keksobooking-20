'use strict';

(function () {
  var IMG_WIDTH = 55;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.photo = function (fromInput, toField) {

    fromInput.addEventListener('change', function () {
      var file = fromInput.files[0];

      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (toField.src !== undefined) {
            toField.src = reader.result;
          } else {
            var previewImg = document.createElement('img');
            previewImg.src = reader.result;
            previewImg.width = IMG_WIDTH;
            toField.appendChild(previewImg);
          }
        });

        reader.readAsDataURL(file);
      }
    });
  };
})();
