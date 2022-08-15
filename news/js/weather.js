// element
const eleWeather = document.querySelector(".container-weather");
const eleName = document.querySelector(".location .name");
const eleCountry = document.querySelector(".location .country");
const eleTemperature = document.querySelector(".temperature");
const eleHumidity = document.querySelector(".humidity");
const eleWind = document.querySelector(".wind");
const eleVision = document.querySelector(".vision");
async function getDataWeather() {
  await API_WEATHER().then((res) => {
    const data = res.data;
    const temp = Math.round(data.main.temp - 273.15); // convert K to C
    if (temp <= 25) {
      eleWeather.classList.add("cool");
    }
    if (temp <= 22) {
      eleWeather.classList.add("warm");
    }
    if (temp <= 19) {
      eleWeather.classList.add("cold");
    } else {
      eleWeather.classList.add("hot");
    }
    let html = `
    <h4 class="location">
    <span class="name">${data.name}</span>
    ,
    <span class="country">${data.sys.country}</span>
    </h4>
    <h2 class="temperature">${Math.round(data.main.temp - 273.15)}°C</h2>
    <div class="group-icon">

    <p>
        <i class="fa-solid fa-droplet"></i>
        <span class="humidity">${data.main.humidity}%</span>

    </p>
    <p>
        <i class="fa-solid fa-wind"></i>
        <span class="wind">${data.wind.speed}m/s</span>

    </p>
    <p>
        <i class="fa-solid fa-eye"></i>
        <span class="vision">${data.visibility}m</span>

    </p>

    </div>
    `;
    eleWeather.innerHTML = html;
  });
}
