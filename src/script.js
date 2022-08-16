let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// let city = prompt("Enter a city ?");
// city = city.toLowerCase();
// if (city !== undefined) {
//   alert(
//     `It is currently ${Math.round(
//       weather[city].temp
//     )}°C in Paris with a humidity of ${weather[city].humidity}%`
//   );
// } else {
//   alert(
//     "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
//   );
// }

let currentTime = document.querySelector("#current-time");
let time = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

let currentCity = document.querySelector("#current-city");
let searchCity = document.querySelector("#city-search");
let cityInput = document.querySelector("#city-input");

function showCity(event) {
  event.preventDefault();
  currentCity.innerHTML = `${cityInput.value}`;
  let apiKey = "bacd3e2c183d335aeddc88046c0dd836";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${cityInput.value}&units=metric`;

  function getTemp(response) {
    let temp = Math.round(response.data.main.temp);
    currentCity.innerHTML = `${cityInput.value}`;
    degree.innerHTML = `${temp}`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemp);
}
searchCity.addEventListener("submit", showCity);

// let currentButton = document.querySelector("current_btn");
// function showCurrentTempreture(event) {
//   console.log(event);
//   //   function showPosition(position) {
//   //     const latitude = position.coords.latitude;
//   //     const longtitude = position.coords.longitude;
//   //     // const apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=metric`;
//   //   }
// }
// navigator.geolocation.getCurrentPosition(showPosition);
// currentButton.addEventListener("click", showCurrentTempreture);

let celsius = document.querySelector("#degree-celsius");
let farenheit = document.querySelector("#degree-farenheit");
let degree = document.querySelector("#deg");
let num = Number(degree.innerHTML);

function calcFarenheit(event) {
  event.preventDefault();
  degree.innerHTML = `${num * (9 / 5) + 32}`;
}
farenheit.addEventListener("click", calcFarenheit);

function calcCelsius() {
  degree.innerHTML = `${num - 32 * (5 / 9)}`;
}
celsius.addEventListener("click", calcCelsius);
