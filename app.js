const apiKey = "64da8212985430d250a48b1c4d308d6b";

const weather = document.querySelector(".weather p");
const city = document.querySelector(".city p");
const citySearch = document.querySelector(".search");

const date = new Date();
const time = date.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

const dayOfWeek = daysOfWeek[date.getDay()];
const day = date.getDate();
const month = months[date.getMonth()];
const year = date.getFullYear();
const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const daySuffix = getDaySuffix(day);

const currentDate = document.querySelector(".date p");
const currentTime = document.querySelector(".time p");
currentTime.innerText = `${time}`;
currentDate.innerText = `${dayOfWeek} ${day}${daySuffix} ${month} ${year}`;
const temp = document.querySelector(".temp");
const minMaxTemp = document.querySelector(".hi-low p");

const images = [
  "normal.avif",
  "rainy.avif",
  "snow.avif",
  "sunny.avif",
  "cloudy.avif",
];

const getWeatherResults = (query) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = `${data.name}, ${data.sys.country}`;
      temp.innerText = `${data.main.temp}°c`;
      weather.innerText = data.weather[0].description;
      minMaxTemp.innerText = `${data.main.temp_min}°c / ${data.main.temp_max}°c`;
      if (weather.innerText.includes("Clear")) {
        const body = document.body;
        body.style.backgroundImage = `url('./${images[0]}')`;
      }
      if (weather.innerText.includes("Rain")) {
        const body = document.body;
        body.style.backgroundImage = `url('./${images[1]}')`;
      }
      if (weather.innerText.includes("Snow")) {
        const body = document.body;
        body.style.backgroundImage = `url('./${images[2]}')`;
      }
      if (weather.innerText.includes("Sun")) {
        const body = document.body;
        body.style.backgroundImage = `url('./${images[3]}')`;
      }
      if (weather.innerText.includes("Cloud")) {
        const body = document.body;
        body.style.backgroundImage = `url('./${images[4]}')`;
      }
    })
    .catch((error) => {
      console.error("Error getting city", error);
      alert(
        `Check for possible error in city name. If city name is separated by '-', search with either parts of the name.`
      );
    });
};

citySearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherResults(citySearch.value);
  }
});
