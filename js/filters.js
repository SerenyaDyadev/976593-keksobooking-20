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

      var typeData = data;
      if (housingType[housingType.selectedIndex].value !== 'any') {
        typeData = data.filter(function (it) {
          return it.offer.type === housingType[housingType.selectedIndex].value;
        });
      }

      var priceData = typeData;
      if (housingPrice[housingPrice.selectedIndex].value !== 'any') {
        priceData = typeData.filter(function (it) {
          var result;
          if (housingPrice[housingPrice.selectedIndex].value === 'low') {
            result = it.offer.price < priceType['low'];
          } else if (housingPrice[housingPrice.selectedIndex].value === 'high') {
            result = it.offer.price > priceType['high'];
          } else if (housingPrice[housingPrice.selectedIndex].value === 'middle') {
            result = (it.offer.price >= priceType['low'] && it.offer.price <= priceType['high']);
          }
          return result;
        });
      }

      var roomsData = priceData;
      if (housingRooms[housingRooms.selectedIndex].value !== 'any') {
        roomsData = priceData.filter(function (it) {
          return String(it.offer.rooms) === housingRooms[housingRooms.selectedIndex].value;
        });
      }

      var guestsData = roomsData;
      if (housingGuests[housingGuests.selectedIndex].value !== 'any') {
        guestsData = roomsData.filter(function (it) {
          return String(it.offer.guests) === housingGuests[housingGuests.selectedIndex].value;
        });
      }

      var featuresData = guestsData;
      if (arr.length !== 0) {
        featuresData = guestsData.filter(function (it) {
          for (var i = 0; i < arr.length; i++) {
            var index = 0;
            if (it.offer.features.indexOf(arr[i]) === -1) {
              index++;
              break;
            }
          }
          return index === 0;
        });
      }

      var newData = featuresData;

      window.render(newData);
    }
  };

})();
