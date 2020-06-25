// Disalbe https to prevent mixed content error?
window.onload = function () {
  $(function () {
    if (window.location.protocol === "https:")
      window.location.protocol = "http";
  });
};

// Initialize UI selectors
const searchBox = document.getElementById("searchText"),
  locationName = document.getElementById("locationName"),
  forecastDescription = document.getElementById("summary"),
  dataColOne = document.getElementById("col-one"),
  dataColTwo = document.getElementById("col-two"),
  theHeader = document.getElementById("theHeader"),
  forecastDisplay = document.getElementById("forecastDisplay");

// Use fetch API to connect with weatherstack api to get forecast
const getForecast = (searchValue) => {
  fetch(
    `http://api.weatherstack.com/current?access_key=5aa3605cb312519ea305b90d159ec3f4&query=${searchValue}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        alert(`Could not find ${searchValue}`);
        return;
      }

      const results = (data) => {
        let locationData = data.location;
        let forecastData = data.current;
        displayForecast(locationData, forecastData);
      };
      results(data);
    });
  });
};

// Function that hides original header, reset searchbox value, and show forecast
const showForecast = () => {
  searchBox.value = "";
  // if the weather is sunny, tell the user to go inside
  theHeader.classList.add("hidden");
  forecastDisplay.classList.remove("hidden");
};

const displayForecast = (locationData, forecastData) => {
  // Modify heading
  locationName.innerText = `
        The weather in ${locationData.name}
    `;

  // Description shown after heading
  forecastDescription.innerText = `
        In ${
          locationData.name
        } it is currently ${forecastData.weather_descriptions[0].toLowerCase()}. Here is all the weather information I found for you:
    `;

  // Information displayed in the first column
  dataColOne.innerHTML = `
        <p>Local date and time: ${locationData.localtime}</p>
        <p>Temperature: ${(forecastData.temperature * 9) / 5 + 32}&#8457;</p>
        <p>Feels like: ${(forecastData.feelslike * 9) / 5 + 32}&#8457;</p>
        <p>UV Index: ${forecastData.uv_index}</p>
        <p>Is the sun still out? ${forecastData.is_day}</p>

    `;

  // Information displayed in the second column
  dataColTwo.innerHTML = `
        <p>Chance of rain: ${forecastData.precip}%</p>        
        <p>Humidity: ${forecastData.humidity}%</p>   
        <p>visibility: ${forecastData.visibility}</p>   
        <p>Wind: ${forecastData.windspeed}</p>
        <p>Wind direction: ${forecastData.wind_dir}</p>
    `;

  // Run function to display the above
  showForecast();
};

// Event listener for enter key to get forecast based on value of search box
document.getElementById("searchText").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getForecast(searchBox.value);
    e.preventDefault();
  }
}),
  false;
