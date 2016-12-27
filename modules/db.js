var csv = require('csvtojson'),
    converter = csv({
      noheader: true,
      trim: true
    }),
    records = {}, currentIndex = 0;

module.exports = {

  init: function(fnCb) {
    converter
      .fromFile('resources/locations.csv')
      .on('json', function(data) {
        var itemId = parseInt(data.field1);
        records[itemId] = {
          id: itemId,
          name: data.field2,
          address: data.field3,
          latitude: data.field4,
          longitude: data.field5
        };
        currentIndex = itemId;
      })
      .on('end', function() {
        if (typeof fnCb === 'function') {
          fnCb();
        }
      });
  },

  getAll: function(fnCb) {
    return typeof fnCb === 'function' ? fnCb(records) : records;
  },

  get: function(id, fnCb) {
    if (!records[id]) {
      var cbParam = {
        message: 'Item ' + id + ' does not exist'
      };
      return typeof fnCb === 'function' ? fnCb(cbParam) : cbParam;
    }

    return typeof fnCb === 'function' ? fnCb(null, records[id]) : records[id];
  },

  update: function(id, newData, fnCb) {
    if (!records[id]) {
      return fnCb({
        message: 'Item ' + id + ' does not exist'
      });
    }

    if (newData.name) {
      records[id].name = newData.name;
    }
    if (newData.address) {
      records[id].address = newData.address;
    }
    if (newData.latitude) {
      records[id].latitude = newData.lat;
    }
    if (newData.longitude) {
      records[id].longitude = newData.long;
    }

    return typeof fnCb === 'function' ? fnCb(null, records[id]) : records[id];
  },

  delete: function(id, fnCb) {
    if (!records[id]) {
      var cbParam = {
        message: 'Item ' + id + ' does not exist'
      };
      return typeof fnCb === 'function' ? fnCb(cbParam) : cbParam;
    }

    delete records[id];
    var cbParam = {
      message: 'Operation completed successfully'
    };
    return typeof fnCb === 'function' ? fnCb(cbParam) : cbParam;
  },

  insert: function(data, fnCb) {
    currentIndex++;
    records[currentIndex] = {
      id: currentIndex,
      name: data.name,
      address: data.address,
      latitude: data.lat,
      longitude: data.long
    }

    var cbParam = {
      newItemId: currentIndex
    };
    return typeof fnCb === 'function' ? fnCb(null, cbParam) : cbParam;
  },

  getProximal: function(address, fnCb) {
    var geolib = require('geolib'),
        http = require('http'),
        self = this;

    http.request({
      host: 'maps.googleapis.com',
      path: '/maps/api/geocode/json?address=' + encodeURIComponent(address)
    }, function(response) {
      var data = '';
      response.on('data', function (chunk) {
        data += chunk;
      });

      response.on('end', function () {
        var translated = JSON.parse(data.trim());
        if (!translated) {
          var cbParam = {
            message: 'Address "' + req.params.address + '" could not be converted to geographical coordinates'
          };
          return typeof fnCb === 'function' ? fnCb(cbParam) : cbParam;
        }

        var lat = translated.results[0].geometry.location.lat,
            long = translated.results[0].geometry.location.lng,
            closest = geolib.findNearest({
              latitude: lat,
              longitude: long
            }, self.getAll()),
            cbParam = self.get(closest.key);

        return typeof fnCb === 'function' ? fnCb(null, cbParam) : cbParam;
      });
    }).end();
  }
}
