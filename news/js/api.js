const API = axios.create({
  baseURL: "https://apiforlearning.zendvn.com/api/",
});

const API_WEATHER = axios.create({
  baseURL:
    "https://api.openweathermap.org/data/2.5/weather?q=ho chi minh&appid=7fb9c9df18898762d9848e6ddf8dc708",
});
