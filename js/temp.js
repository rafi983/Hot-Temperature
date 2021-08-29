const apiKey = "Your_API_Key";

const searchCity = async () => {
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchFieldText}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  getCityWeather(data);
};

const getCityWeather = (cityTemp) => {
  const searchField = document.getElementById("search-field");
  const weatherStatus = document.querySelector(".weather-status");

  const { icon, description } = cityTemp.weather[0];

  weatherStatus.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${icon}.png" width="150px">
  <h1>${searchField.value}</h1>
  <h3>Temp: ${Math.round(cityTemp.main.temp)}&deg;C</h3>
  <h3>Weather: ${description}</h3>
  <h3>Temp Range: ${Math.round(cityTemp.main.temp_min)}&deg;C / ${Math.round(
    cityTemp.main.temp_max
  )}&deg;C </h3>`;
  searchField.value = "";
};
