'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var priceType = {
    'low': 10000,
    'high': 50000,
  };

  window.filters = {
    updateData: function (data, arr) {
      var newData = data.filter(function (it) {

        var typeFlag = true;
        if (housingType.value !== 'any') {
          typeFlag = housingType.value !== 'any' && String(it.offer.type) === housingType.value;
        }

        var priceFlag = true;
        if (housingPrice.value !== 'any') {
          if (housingPrice.value === 'low') {
            priceFlag = it.offer.price < priceType['low'];
          } else if (housingPrice.value === 'high') {
            priceFlag = it.offer.price > priceType['high'];
          } else if (housingPrice.value === 'middle') {
            priceFlag = (it.offer.price >= priceType['low'] && it.offer.price <= priceType['high']);
          }
        }

        var roomsFlag = true;
        if (housingRooms.value !== 'any') {
          roomsFlag = String(it.offer.rooms) === housingRooms.value;
        }

        var guestsFlag = true;
        if (housingGuests.value !== 'any') {
          guestsFlag = String(it.offer.guests) === housingGuests.value;
        }

        var featuresFlag = true;
        if (arr.length !== 0) {
          for (var i = 0; i < arr.length; i++) {
            if (it.offer.features.indexOf(arr[i]) === -1) {
              featuresFlag = false;
              break;
            }
          }
        }

        if (typeFlag && priceFlag && roomsFlag && guestsFlag && featuresFlag) {
          var result = true;
        }

        return result;
      });

      window.render(newData);
    }
  };
})();
