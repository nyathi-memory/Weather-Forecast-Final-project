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

  getForecast(response.data.city);
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
  
  // Format hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  // Add leading zero for hours if less than 10
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  // Add leading zero for minutes if less than 10
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  return `${day} ${hours}:${minutes}`;
}

  function searchCity(city){

    let apiKey = "3096aob3bd9034ff0bt0a3f61281ee49";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchIput = document.querySelector("#search-form-input");

  searchCity(searchIput.value);
}
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
  function getForecast(city){
    let apiKey = "3096aob3bd9034ff0bt0a3f61281ee49";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast);
  }


  function displayForecast(response){
    let forecastHTML = "";

    response.data.daily.forEach(function(day, index){
      if (index < 5) {
      forecastHTML =
       forecastHTML + `
      <div class="forecast-day">
                           <div class="forecast-date">${formatDay(day.time)}</div>
                           <div class="forecast-icon">
                               <img src="${day.condition.icon_url}" class = "forecast-icon"/>
                           </div>
                           <div class="forecast-temperatures">
                               <div class="forecast-temperature">
                                   <strong>${Math.round(day.temperature.maximum)}°C </strong>
                               </div>
                               <div class="forecast-temperature">
                                   <strong>${Math.round(day.temperature.minimum)}°C</strong>
                               </div>
                           </div>
   
                       </div>
                       `;
                      }
                    });
                    let forecastElement = document.querySelector("#forecast"); 
                    forecastElement.innerHTML = forecastHTML;
                  }
  let searchFormElement =document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

  
  searchCity("Johannesburg");
  
 