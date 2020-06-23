const searchBox = document.getElementById('searchText');


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
    searchBox.value = ''
}


document.getElementById('searchText').addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        getForecast(searchBox.value)
        e.preventDefault();
    };

}), false;