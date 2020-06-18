'use strict';
(function () {
  window.form = function () {
    var addForm = document.querySelector('.ad-form');
    var mapFilters = document.querySelector('.map__filters');

    var addEnableDisabledAttribute = function (elements, boolean) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].disabled = boolean;
      }
    };

    addEnableDisabledAttribute(addForm.querySelectorAll('select, fieldset'), true);
    addEnableDisabledAttribute(mapFilters.querySelectorAll('select, fieldset'), true);

    var capacityRooms = addForm.querySelector('#room_number');
    var capacityGuests = addForm.querySelector('#capacity');

    var optionsEnable = function () {
      for (var j = capacityGuests.selectedIndex; j < capacityGuests.length - 1; j++) {
        capacityGuests.options[j].disabled = false;
      }
    };

    var validationRoomsGuests = function () {
      addEnableDisabledAttribute(capacityGuests, true);

      if (capacityRooms[capacityRooms.selectedIndex].value === '100') {
        capacityGuests.options[capacityGuests.length - 1].selected = true;
        capacityGuests.options[capacityGuests.length - 1].disabled = false;
      } else {
        for (var i = 0; i < capacityGuests.length; i++) {
          if (capacityRooms[capacityRooms.selectedIndex].value === capacityGuests.options[i].value) {
            capacityGuests.options[i].selected = true;
            optionsEnable();
          }
        }
      }
    };

    var typePlace = addForm.querySelector('#type');
    var pricePlace = addForm.querySelector('#price');

    var typesAndPrices = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    var validationTypePrice = function () {
      pricePlace.min = typesAndPrices[typePlace.options[typePlace.selectedIndex].value];
      pricePlace.placeholder = typesAndPrices[typePlace.options[typePlace.selectedIndex].value];
    };

    var timeCheckin = addForm.querySelector('#timein');
    var timeCheckout = addForm.querySelector('#timeout');

    var validationTimeCheckout = function () {
      timeCheckout.options[timeCheckin.selectedIndex].selected = true;
    };

    var validationTimeCheckin = function () {
      timeCheckin.options[timeCheckout.selectedIndex].selected = true;
    };

    capacityRooms.addEventListener('change', function () {
      validationRoomsGuests();
    });

    typePlace.addEventListener('change', function () {
      validationTypePrice();
    });

    timeCheckin.addEventListener('change', function () {
      validationTimeCheckout();
    });

    timeCheckout.addEventListener('change', function () {
      validationTimeCheckin();
    });

    addForm.classList.remove('ad-form--disabled');
    addEnableDisabledAttribute(addForm.querySelectorAll('select, fieldset'), false);
    addEnableDisabledAttribute(mapFilters.querySelectorAll('select, fieldset'), false);
    validationRoomsGuests();
    validationTypePrice();
    validationTimeCheckout();
    validationTimeCheckin();
  };
})();
