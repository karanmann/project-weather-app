//apiKey = "3eb926770233f3bacc440bffc14e56a4"
let cityLocation = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let sunRiseTime = document.getElementById("sunrise");
let sunSetTime = document.getElementById("sunset");


// GET WEATHER REPORT

window.addEventListener("load", () => {
  let cityLocation = "stockholm";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {

      const apiOneDay = `http://api.openweathermap.org/data/2.5/weather?q=${cityLocation}&appid=3eb926770233f3bacc440bffc14e56a4`;
      const apiFiveDays =
        fetch(apiOneDay)
          .then((response) => {
            return response.json();
          })
          .then(data => {
            const { name } = data;
            const { feels_like } = data.main;
            const { sunrise } = data.sys;
            const { sunset } = data.sys;
            const { id, main } = data.weather[0];
            cityLocation.textContent = name;
            tempValue.textContent = Math.round(feels_like - 273)
            climate.textContent = main;

            var unixSunriseTime = new Date(sunrise * 1000);
            var sunriseHour = unixSunriseTime.getHours();
            var sunriseMinutes = "0" + unixSunriseTime.getMinutes();
            var sunriseSeconds = "0" + unixSunriseTime.getSeconds();
            var formattedSunrise = `Sunrise : ${sunriseHour}:${sunriseMinutes.substr(-2)}:${sunriseSeconds.substr(-2)}`

            var unixSunsetTime = new Date(sunset * 1000);
            var sunsetHour = unixSunsetTime.getHours();
            var sunsetMinutes = "0" + unixSunsetTime.getMinutes();
            var sunsetSeconds = "0" + unixSunsetTime.getSeconds();
            var formattedSunset = `Sunset : ${sunsetHour}:${sunsetMinutes.substr(-2)}:${sunsetSeconds.substr(-2)}`

            sunRiseTime.textContent = formattedSunrise;
            sunSetTime.textContent = formattedSunset;

            if (id < 250) {
              tempIcon.src = './images/icons/thunder.png'
            }
            else if (id < 350) {
              tempIcon.src = './images/icons/lightrain.png'
            } else if (id < 550) {
              tempIcon.src = './images/icons/heavyrain.png'
            } else if (id < 650) {
              tempIcon.src = './images/icons/snow.png'
            } else if (id < 800) {
              tempIcon.src = './images/icons/thunder.png'
            } else if (id == 800) {
              tempIcon.src = './images/icons/badweather.png'
            } else if (id > 800) {
              tempIcon.src = './images/icons/clear.png'
            } else {
              tempIcon.src = './images/icon/badweather.png'
            };
            console.log(data);

          });
    });
  };
});