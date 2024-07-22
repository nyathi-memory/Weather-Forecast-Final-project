function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = (`${response.data.wind.speed}km/h`);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", response.data.condition.icon_url);
  }
  function formatDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[date.getDay()];
    //if minutes are lower than 10, add 0
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    
    return `${day} ${date.getHours()}:${date.getMinutes()}`;
  }
function searchCity(city){

    let apiKey = "3096aob3bd9034ff0bt0a3f61281ee49";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchIput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchIput.value;
    searchCity(searchIput.value);
  }
  let searchFormElement =document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);