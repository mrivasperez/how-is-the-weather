const forecast = require('./forecast');
const request = require('postman-request');

const search = (location) => {
    if (!location) {
        console.log('You did not type a location');
        return;
    } else {
        let locationurl = `http://api.weatherstack.com/current?access_key=5aa3605cb312519ea305b90d159ec3f4&query=${location}`;
        // Use the postman-request npm package to request info from userLocation
        request({url: locationurl, json: true}, (error, response) => {
            const forecastData = response.body;
            // ERROR HANDLER for request
            if (error) {
                console.log('ERROR: Unable to connect to weather service. Are you online?'); 
                return;
            } else if (forecastData.error){
                console.log('ERROR: Unable to find location. Please try a different search.');
            // formatted results 
            } else {
                forecast.forecast(forecastData);
            };
        });
     }
}

exports.search = search;