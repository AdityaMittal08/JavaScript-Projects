const apiKey = "";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")
const card = document.querySelector(".card");

const temperature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

async function checkWeather(city){
  const response = await fetch(apiUrl + city +`&appid=${apiKey}`);

  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    card.className = 'card';
  }else{
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    temperature.innerHTML = Math.round(data.main.temp) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/hr";

    card.classList.remove('clear-bg', 'clouds-bg', 'rain-bg', 'drizzle-bg', 'mist-bg');
    
    if(data.weather[0].main == "Clouds"){
      weatherIcon.src = "weather-app-img/images/clouds.png";
      card.classList.add('clouds-bg');
    }
    else if(data.weather[0].main == "Clear"){
      weatherIcon.src = "weather-app-img/images/clear.png";
      card.classList.add('clear-bg');
    }
    else if(data.weather[0].main == "Rain"){
      weatherIcon.src = "weather-app-img/images/rain.png";
      card.classList.add('rain-bg');
    }
    else if(data.weather[0].main == "Drizzle"){
      weatherIcon.src = "weather-app-img/images/drizzle.png";
      card.classList.add('drizzle-bg');
    }
    else if(data.weather[0].main == "Mist"){
      weatherIcon.src = "weather-app-img/images/mist.png";
      card.classList.add('mist-bg');
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

  }

}
searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
});
searchBox.addEventListener('keydown', (event) => {
  console.log(`keypressed down: ${event.key}`);
  if(event.key === 'Enter'){
    checkWeather(searchBox.value);
  }
});