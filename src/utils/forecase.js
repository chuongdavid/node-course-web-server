const request = require("request");
const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ca6be08f697597ac93ba7f657abe8995&query=" +
    latitude +
    "," +
    longtitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service !", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          body.current.temperature +
          ". It feels like " +
          body.current.feelslike +
          " degrees out."
      );
    }
  });
};
module.exports = forecast;
