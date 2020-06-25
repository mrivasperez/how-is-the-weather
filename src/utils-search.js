const request = require("postman-request");

const search = (location = "Seattle", callback) => {
  if (!location) {
    console.log("no location...?");
  }
  // Set location url to location
  const locationurl = `http://api.weatherstack.com/current?access_key=5aa3605cb312519ea305b90d159ec3f4&query=${location}`;

  // Use the postman-request npm package to request info from userLocation
  request({ url: locationurl, json: true }, (error, response) => {
    const forecastData = response.body;
    // ERROR HANDLER for request
    if (error) {
      console.log("error");
      callback(
        "ERROR: Unable to connect to weather service. Are you online?",
        undefined
      );
    } else if (forecastData.error) {
      console.log("error");
      callback(
        "ERROR: Unable to find location. Please try a different search.",
        undefined
      );
      // formatted results
    } else {
      console.log("no error");
      callback(undefined, {
        location: forecastData.location.name,
        temperature: forecastData.current.temperature,
        weather_description: forecastData.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = search;
