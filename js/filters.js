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
        if (housingType[housingType.selectedIndex].value !== 'any') {
          typeFlag = String(it.offer.type) === housingType[housingType.selectedIndex].value;
        }

        var priceFlag = true;
        if (housingPrice[housingPrice.selectedIndex].value !== 'any') {
          if (housingPrice[housingPrice.selectedIndex].value === 'low') {
            priceFlag = it.offer.price < priceType['low'];
          } else if (housingPrice[housingPrice.selectedIndex].value === 'high') {
            priceFlag = it.offer.price > priceType['high'];
          } else if (housingPrice[housingPrice.selectedIndex].value === 'middle') {
            priceFlag = (it.offer.price >= priceType['low'] && it.offer.price <= priceType['high']);
          }
        }

        var roomsFlag = true;
        if (housingRooms[housingRooms.selectedIndex].value !== 'any') {
          roomsFlag = String(it.offer.rooms) === housingRooms[housingRooms.selectedIndex].value;
        }

        var guestsFlag = true;
        if (housingGuests[housingGuests.selectedIndex].value !== 'any') {
          guestsFlag = String(it.offer.guests) === housingGuests[housingGuests.selectedIndex].value;
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
