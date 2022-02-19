let now = new Date();

let currentSummaryDate = document.querySelector(".current-summary-date");

let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurdsday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

currentSummaryDate.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let currentSummaryPlace = document.querySelector(".current-summary-place");
  if (searchInput.value) {
    let apiKey = "60ce786765a7bafce2c0d732bb827118";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    currentSummaryPlace.innerHTML = null;
    alert("Please type a city");
  }
}

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", search);

//let form = document.querySelector("#search-form");
//form.addEventListener("submit", search);

function changeToFarenheit(event) {
  event.preventDefault();
  let defaultCentigrade = document.querySelector(
    "#current-summary-temperature-number"
  );
  let replaceCentigrade = document.querySelector(
    "#current-summary-temperature-default-centigrade"
  );
  defaultCentigrade.innerHTML = `46`;
  replaceCentigrade.innerHTML = "℉";
}

let switchToFarenheit = document.querySelector("#switchFarenheit");
switchToFarenheit.addEventListener("click", changeToFarenheit);

function changeToCentigrade(event) {
  event.preventDefault();
  let nonDefaultFarenheit = document.querySelector(
    "#current-summary-temperature-number"
  );
  let replaceFarenheit = document.querySelector(
    "#current-summary-temperature-default-centigrade"
  );
  nonDefaultFarenheit.innerHTML = `8`;
  replaceFarenheit.innerHTML = "°C";
}

let switchToCentigrade = document.querySelector("#switchCentigrade");
switchToCentigrade.addEventListener("click", changeToCentigrade);

let localSearchButton = document.querySelector(".local-search-button");
localSearchButton.addEventListener("click", localSearch);

function localSearch(event) {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(localLocation);
}

function localLocation(position) {
  let apiKey = "60ce786765a7bafce2c0d732bb827118";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(localSearch);

function showTemperature(response) {
  console.log(response);
  let currentSummaryPlace = document.querySelector(".current-summary-place");
  currentSummaryPlace.innerHTML = response.data.name;
  let defaultCentigrade = document.querySelector(
    "#current-summary-temperature-number"
  );
  defaultCentigrade.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "60ce786765a7bafce2c0d732bb827118";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
let city = "London";
axios.get(apiUrl).then(showTemperature);