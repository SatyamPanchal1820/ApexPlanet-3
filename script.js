const apiKey = "312abfd953c970ceaf81f671079f6e22";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const errorDiv = document.querySelector(".error");
const cardsContainer = document.querySelector(".cards-container");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    errorDiv.style.display = "block";
  } else {
    errorDiv.style.display = "none";
    const data = await response.json();

    const weatherMain = data.weather[0].main;
    let weatherImage = "images/wind.png"; // default
    if (weatherMain === "Clouds") weatherImage = "images/clouds.png";
    else if (weatherMain === "Clear") weatherImage = "images/clear.png";
    else if (weatherMain === "Rain") weatherImage = "images/rain.png";
    else if (weatherMain === "Drizzle") weatherImage = "images/drizzle.png";
    else if (weatherMain === "Mist") weatherImage = "images/mist.png";
    else if (weatherMain === "Snow") weatherImage = "images/snow.png";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${weatherImage}" alt="weather icon" class="weather-icon">
      <h1 class="temp">20°C</h1>
      <h2 class="city">${data.name}</h2>
      <div class="details">
        <div class="col">
          <img src="images/humidity.png" alt="humidity icon">
          <div>
            <p class="humidity">50%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div class="col">
          <img src="images/wind.png" alt="wind icon">
          <div>
            <p class="wind">15 KM/H</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    `;

    cardsContainer.appendChild(card);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
    searchBox.value = "";
  }
});
