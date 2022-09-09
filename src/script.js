let currentTime = document.querySelector("#current-time");
let time = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(
    ":"
  );
}

currentTime.innerHTML = `${days[time.getDay()]}, ${time.getDate()} ${
  month[time.getMonth()]
}, ${formatDate(time)}`;

function displayForecast() {
  let forecastElement = document.querySelector("#weather_forecast");
  let forecastHTML = `<div class="d-flex justify-content-evenly m-5 fs-3 hourly">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="hourly_in" id="weather_forecast">
    <p>Mon</p>
    <img class="img_siz" src="./src/img/sun_cloud.gif" alt="sun_cloud">
    <div>
      <span class="weather_forecast_tempreture_max">28º</span>
      <span class="weather_forecast_tempreture_min">12º</span>
    </div>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let currentCity = document.querySelector("#current-city");
let searchCity = document.querySelector("#city-search");
let cityInput = document.querySelector("#city-input");
let iconElement = document.querySelector("#icon");
let weatherDescription = document.querySelector("#weather_description");
let humidityCurrent = document.querySelector("#humidity_cur");
let wind = document.querySelector("#wind");
let celsius = document.querySelector("#degree-celsius");
let farenheit = document.querySelector("#degree-farenheit");
let degree = document.querySelector("#deg");

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey1 = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl1 = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey1}&units=metric`;
  console.log(apiUrl1); // !!!!! Error 401 in API !!!!!!
}

function showCity(event) {
  event.preventDefault();
  let apiKey = "bacd3e2c183d335aeddc88046c0dd836";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${cityInput.value}&units=metric`;

  function getTemp(response) {
    let temp = Math.round(response.data.main.temp);

    getForecast(response.data.coord);

    function calcFarenheit(event) {
      event.preventDefault();
      let farenheitTempreture = `${(temp * 9) / 5 + 32}`;
      deg.innerHTML = Math.round(farenheitTempreture);
    }
    farenheit.addEventListener("click", calcFarenheit);

    function calcCelsius(event) {
      event.preventDefault();
      deg.innerHTML = `${Math.round(temp)}`;
      celsius.classList.remove("active");
    }
    celsius.addEventListener("click", calcCelsius);

    currentCity.innerHTML = `${response.data.name}`;
    degree.innerHTML = `${temp}`;
    weatherDescription.innerHTML = `${response.data.weather[0].description}`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
    humidityCurrent.innerHTML = `${response.data.main.humidity}`;
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}
searchCity.addEventListener("submit", showCity);

displayForecast();
