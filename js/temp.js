const apiKey = "Your_API_Key";

const searchCity = async () => {
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;

  if (searchFieldText.length > 0) {
    document.getElementById("spinner").classList.remove("d-none");
  }
  if (searchFieldText == "") {
    alert("Enter a city");
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchFieldText}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    getCityWeather(data);
  }
};

const getCityWeather = (cityTemp) => {
  document.getElementById("spinner").classList.add("d-none");
  console.log(cityTemp);
  const searchField = document.getElementById("search-field");
  const weatherStatus = document.querySelector(".weather-status");
  const infoTxt = document.querySelector(".info-txt");

  if (cityTemp.cod == 404) {
    infoTxt.innerText = `${cityTemp.message} `;
    searchField.value = "";
    weatherStatus.innerHTML = "";
  } else {
    const { icon, description } = cityTemp.weather[0];
    infoTxt.innerText = "";
    weatherStatus.innerHTML = `
             <img src="https://openweathermap.org/img/wn/${icon}.png" width="150px">
             <h1>${searchField.value}</h1>
             <h3>Temp: ${Math.round(cityTemp.main.temp)}&deg;C</h3>
             <h3>Humidity: ${cityTemp.main.humidity}%</h3>
             <h3>Weather: ${description}</h3>
             <h3>Temp Range: ${Math.round(
               cityTemp.main.temp_min
             )}&deg;C / ${Math.round(cityTemp.main.temp_max)}&deg;C </h3>   
             `;
    searchField.value = "";
  }
};
