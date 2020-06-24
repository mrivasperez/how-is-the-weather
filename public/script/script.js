const searchBox = document.getElementById('searchText'),
locationName = document.getElementById('locationName'),
forecastDescription = document.getElementById('summary'),
dataColOne = document.getElementById('col-one'),
dataColTwo = document.getElementById('col-two'),
theHeader = document.getElementById('theHeader');




console.log('Connected to client-side script!');


const getForecast = (searchValue) => {
    fetch(`http://api.weatherstack.com/current?access_key=5aa3605cb312519ea305b90d159ec3f4&query=${searchValue}`).then((response) => {
        response.json().then((data) => {

            const results = (data) => {
                let locationData = data.location;
                let forecastData = data.current;
            
                displayForecast(locationData, forecastData)
            }

            results(data);
        })
    });

}


const displayForecast = (locationData, forecastData) => {
    console.log(locationData);
    console.log(forecastData);
    searchBox.value = '';
    // if the weather is sunny, tell the user to go inside
    theHeader.style.display = 'none';
    console.log(forecastData.weather_descriptions[0]);
    locationName.innerText = `The weather in ${locationData.name}`;
    forecastDescription.innerText = `In ${locationData.name} it is currently ${forecastData.weather_descriptions[0].toLowerCase()}. Here is all the weather information I found for you:`;
    dataColOne.innerHTML = (`
        <p>Local date and time: ${locationData.localtime}</p>
        <p>Temperature: ${forecastData.temperature}</p>
        <p>Feels like: ${forecastData.feelslike}</p>
        <p>UV Index: ${forecastData.uv_index}</p>
        <p>Is the sun still out? ${forecastData.is_day}</p>

    `);

    dataColTwo.innerHTML = (`
        <p>Chance of rain: ${forecastData.precip}</p>        
        <p>Humidity: ${forecastData.humidity}</p>   
        <p>visibility: ${forecastData.visibility}</p>   
        <p>Wind: ${forecastData.windspeed}</p>
        <p>Wind direction: ${forecastData.wind_dir}</p>
    `)
    // such and such .innerhtml for columns
}


document.getElementById('searchText').addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        getForecast(searchBox.value)
        e.preventDefault();
    };

}), false;