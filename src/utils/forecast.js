const request = require('postman-request');
const search = require('./search');


const forecast = (forecastData) => {
    console.log(`In ${forecastData.location.name}, it is ${forecastData.current.weather_descriptions[0]}. The temperature is ${(((forecastData.current.temperature)*(9/5))+32)} degrees Fahrenheit. There is a ${forecastData.current.precip} percent change of rain. It feels like it is ${(((forecastData.current.feelslike)*(9/5))+32)} degrees Fahrenheit.`);   
};




exports.forecast = forecast;