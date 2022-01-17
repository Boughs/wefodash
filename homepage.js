// Get form element value, select city list container and daily weather container
var leftColumnEL = document.querySelector("#left-column");
var citiesListContainerBtnEl = document.querySelector(".list-group-item");
var dailyWeatherContainerEl = document.querySelector("#forecast-output-container"); 

// dynamic city search container
var dynFormContainer = document.createElement("form");
dynFormContainer.setAttribute("id", "dymCityForm");
dynFormContainer.classList = "city-search-forecast-container";
leftColumnEL.appendChild(dynFormContainer)
var formH3 = document.createElement("h3");
formH3.textContent = " Search for a City ";
dynFormContainer.appendChild(formH3);
// city search input
var formInput = document.createElement("input");
formInput.setAttribute("id", "city-name")
formInput.setAttribute("type", "text");
formInput.setAttribute("autofocus", "true");
formInput.classList = "form-input";
dynFormContainer.appendChild(formInput);
// submit search
var formButton = document.createElement("button");
formButton.setAttribute("type", "submit");
formButton.classList= ("btn fas fa-search");
dynFormContainer.appendChild(formButton);
// Find the city form
var seachEventHanglerEl = document.querySelector("#dymCityForm");
var searchByCityEl = document.querySelector("#city-name");

// Left column cities container
var citiesContainerEl = document.createElement("div");
citiesContainerEl.setAttribute("id", "dym-cities-list");
citiesContainerEl.classList = "list-group";
// Append to the left column
leftColumnEL.appendChild(citiesContainerEl);
// select list div container
var citiesListContainerEl = document.querySelector("#dym-cities-list");
// load previously searched cities from local storage function
var populateSavedCities = function() {
       var citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));
         
       if (citiesLocalStorage === null) {  
       } else {
       $(".list-group-item").remove();
           
        for (i=0; i< citiesLocalStorage.length;i++) {
            var cityNameEl = document.createElement("a")
            cityNameEl.setAttribute("href", "#")
            cityNameEl.setAttribute("data-city", citiesLocalStorage[i]);
            cityNameEl.setAttribute("id", citiesLocalStorage[i]);
            cityNameEl.setAttribute("role", "button");
            cityNameEl.classList = "list-group-item list-group-item-action list-group-item-primary";
            cityNameEl.textContent = citiesLocalStorage[i];
            citiesContainerEl.appendChild(cityNameEl);
        };
       };
};

// *** Second fetch call
function fetchSecondCall(searchByCity, latNum, lonNum, unixTimeCurrentDay, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed) {
    var openWeatherApiFiveDayUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + latNum + "&lon=" + lonNum + "&appid=f82c0e50448d06d826dd5f0c0aaebf1c&units=imperial"
    
    fetch(openWeatherApiFiveDayUrl).then(function (response) {
      return response.json();
    })
    .then(function (secondCallData) {
        // *** Current Day data *** //
        // Current Day UV
        var uvIndex = secondCallData.current.uvi

        //Curent date
		var unix_timestamp = unixTimeCurrentDay;
        var date = new Date(unix_timestamp * 1000);
        var fullDayDaily = "(" + (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear() + ")";       
        // Populate current day data
        populateCurrentDayHtml(searchByCity, fullDayDaily, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed, uvIndex);
		// Populate 5 day forcast
        populate5DayForecast(secondCallData)
    });
};

// Function to populate current day forecast
function populateCurrentDayHtml(searchByCity, fullDayDaily, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed, uvIndex) {
    // Populate current Day html elements
    var dailyForecastContainerEl = document.createElement("div");
    dailyForecastContainerEl.setAttribute("id", "daily-forecast-container");
    dailyForecastContainerEl.classList = "borderDiv";

    var currentDayTitle = document.createElement("h3");
    currentDayTitle.textContent = ( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) + " " + fullDayDaily);

    var currentIconEl = document.createElement("span")
    var currentIconSymbol = "http://openweathermap.org/img/wn/" + currentDayIcon + "@2x.png";
   currentIconEl.innerHTML = "<img src=" + currentIconSymbol + "></img>";
   currentDayTitle.append(currentIconEl)

    // p elements to store current day info
    var currentTempEl = document.createElement("p");
    var currentHumidityEl = document.createElement("p");
    var currentWinSpEl = document.createElement("p");
    var currentUvIEl = document.createElement("p");
	// display day info
    currentTempEl.textContent = "Temperature: " + (currentTempImperial.toFixed(1)) + " °F";
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentWinSpEl.textContent = "Wind Speed: " + currentMPS + " MPH";
    currentUvIEl.textContent = "UV Index: " + uvIndex;

    $("#daily-forecast-container").remove();
    // Append daily forecast
    dailyWeatherContainerEl.appendChild(dailyForecastContainerEl);
    dailyForecastContainerEl.appendChild(currentDayTitle);
    dailyForecastContainerEl.appendChild(currentTempEl);
    dailyForecastContainerEl.appendChild(currentHumidityEl);
    dailyForecastContainerEl.appendChild(currentWinSpEl);
    dailyForecastContainerEl.appendChild(currentUvIEl);
};

// 5 day forcast
function populate5DayForecast(secondCallData) {
    
    $("#weekly-forecast-container").remove();
	// define weekly variables
    var weeklyForecastContainerEl = document.createElement("div");
    weeklyForecastContainerEl.setAttribute("id", "weekly-forecast-container");
    weeklyForecastContainerEl.classList = "border-Div-right-column"; 

    var fiveDayForecast = document.createElement("h3");
    fiveDayForecast.textContent = "5-Day Forecast:"

    dailyWeatherContainerEl.appendChild(weeklyForecastContainerEl);
    weeklyForecastContainerEl.appendChild(fiveDayForecast);

    // div to hold weekly forcast 
    var weeklyFlexContainerEL = document.createElement("div");
    weeklyFlexContainerEL.classList = "weekly-flex-conatiner"
    weeklyForecastContainerEl.appendChild(weeklyFlexContainerEL);

	// display 5 days of weather
    for (i=1; i <= 5; i++) {
		var unixTime = secondCallData.daily[i].dt;
    
        var unix_timestamp = unixTime;
        var date = new Date(unix_timestamp * 1000);
        var fullDay = (date.getMonth() + 1) + "/" + date.getDate() + "/"  + date.getFullYear(); // Date
        var iconWeather = secondCallData.daily[i].weather[0].icon // icon
        var fahrenheitTemp = secondCallData.daily[i].temp.day // Temp @ fahrenheit
        var humidity = secondCallData.daily[i].humidity;
        //div to hold each day of the weekly forecast
        var eachDayContainer = document.createElement("div");
        eachDayContainer.setAttribute("id", ("day=" + [i]));
        eachDayContainer.classList = "border-div-five-day-forecast";
       var currentDayTitle = document.createElement("p");
        currentDayTitle.textContent = (fullDay);
		// Span to hold the icon
        var iconSpan = document.createElement("p");
        iconSpan.textContent = "";
		var currentIconEl = document.createElement("span")
        var currentIconSymbol = "http://openweathermap.org/img/wn/" + iconWeather + "@2x.png";
        currentIconEl.innerHTML = "<img src=" + currentIconSymbol + "></img>";
        iconSpan.append(currentIconEl)

        // p elements hold current day information
        var currentTempEl = document.createElement("p");
        var currentHumidityEl = document.createElement("p");
        
        currentTempEl.textContent = "Temperature: " +  (fahrenheitTemp.toFixed(2)) + " °F";
        currentHumidityEl.textContent = "Humidity: " + humidity + "%";
        // append daily forecast
        eachDayContainer.appendChild(currentDayTitle);
        eachDayContainer.appendChild(currentIconEl);
        eachDayContainer.appendChild(currentTempEl);
        eachDayContainer.appendChild(currentHumidityEl);
        // append parent
        weeklyFlexContainerEL.appendChild(eachDayContainer);
    };
};

// generate weater data after submission
var getWeatherData = function (event , cityClicked) {
    event.preventDefault() 

    if (cityClicked) {
        var searchByCity = cityClicked.trim();
    } else {
        var searchByCity = searchByCityEl.value.trim();
    };
	// check if nothing was submitted
    if (searchByCity == "") {
        alert("Please fill out city name");
        searchByCityEl.value = "";
        return 
    } else {
        searchByCityEl.value = "";
    };
	// array from local storage
    var citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));
	// City exist or not
    var cityExist = 0;
	// Check if array is null and create new one again.
    if (citiesLocalStorage === null) {
        citiesSearched =  new Array();
    } else {
        citiesSearched = citiesLocalStorage;
    };
	// API call to get latitude and longitude
    var openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchByCity + "&appid=f82c0e50448d06d826dd5f0c0aaebf1c&units=imperial";

    fetch(openWeatherApiUrl).then(function (weatherResponse) {
        
        if(weatherResponse.ok) { 
        return weatherResponse.json();
        } else {
            window.alert("Error: " + weatherResponse.statusText + "\nCould not recognize city, please type again");
            // Clear input parameter from user
            searchByCityEl.value = "";
            return;
        }
    }).then(function (weatherLatLon) {
        // current day variables
        var latNum = weatherLatLon.coord.lat;
        var lonNum = weatherLatLon.coord.lon;
        var unixTimeCurrentDay = weatherLatLon.dt
        var currentDayIcon = weatherLatLon.weather[0].icon
        var currentTempImperial = weatherLatLon.main.temp
        var currentHumidity = weatherLatLon.main.humidity
        var currentMPS = weatherLatLon.wind.speed
        var mphWindSpeed = Math.round(currentMPS * 2.237)
		// Add the sucessful api call to local storage and check if city is new
        for (i=0; i < citiesSearched.length; i++) {
            if (searchByCity.toLowerCase() === citiesSearched[i].toLowerCase()) {
                cityExist =1
                break;
            };
        };
        if (cityExist === 0) {
            citiesSearched.push(searchByCity.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '));
            // Save to local storage
            localStorage.setItem("savedCities", JSON.stringify(citiesSearched));
        }
        fetchSecondCall(searchByCity.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '), latNum, lonNum, unixTimeCurrentDay, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed);
		// when items have been pushed to array populate the cities in html 
        populateSavedCities();
      }).catch(function(error) {
        return;
      });

};

// Event listener for submit button
seachEventHanglerEl.addEventListener("submit",getWeatherData);

// Funciton to handle the event from the list of cities when clicked.
var cityClicked = function (event) {
    var cityClicked = event.target.getAttribute("data-city")
    if (cityClicked){
        getWeatherData(event, cityClicked);
    } else {
        alert("Internal error");
    };
};

// Event listener for cities
citiesContainerEl.addEventListener("click", cityClicked)

// Load saved cities
populateSavedCities();