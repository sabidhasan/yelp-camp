var ForecastIo = require('forecast.io');
var weatherKey = require('./weatherKey').apiKey;

// ForecastIo is not promisified - adding asyncGetWeather method to allow a
// promise-based wrapper around native 'get' method
ForecastIo.prototype.asyncGetWeather = function(lat, lon) {
  return new Promise(function(resolve, reject) {
    weatherEngine.get(lat, lon, function(error, results, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}

var weatherEngine = new ForecastIo({APIKey: weatherKey, timeout: 500});

module.exports = weatherEngine;
