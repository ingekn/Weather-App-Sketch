// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

function displayTimeAndDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let currentDay = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  dateElement.innerHTML = `${days[currentDay]}, ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#day-plus-time");
let currentTime = new Date();
displayTimeAndDate(currentTime);

// 🕵️‍♀️Feature #2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function updateWeather(response) {
  console.log(response);
  document.querySelector(".city").innerHTML = response.data.name;
  newTemperature = Math.round(response.data.main.temp);
  let oldTemperature = document.querySelector(".temp");
  oldTemperature.innerHTML = `${newTemperature}`;
  // -> short code is
  // document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp)
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  const apiKey = "f81614abe2395d5dfecd45b9298041de";
  const ownApiKey = "33d1903aae9a8dd9cb119a9d70a09d9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ownApiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function convertFahrenheit(event) {
  event.preventDefault;
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertCelcius(event) {
  event.preventDefault;
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let temperatureElement = document.querySelector(".temp");

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelcius);

// get location

// function showTemperature(response) {
//   console.log(response);
//   let newTemperature = Math.round(response.data.main.temp);
//   let oldTemperature = document.querySelector(".temp");
//   oldTemperature.innerHTML = `${newTemperature}C`;
// }

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  const apiKey = "f81614abe2395d5dfecd45b9298041de";
  const ownApiKey = "33d1903aae9a8dd9cb119a9d70a09d9d";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
}

function searchUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", searchUserLocation);

search("New York");
