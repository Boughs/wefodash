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