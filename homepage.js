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
