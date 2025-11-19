const cityInput = document.querySelector(".inputCity");
const weatherForm = document.querySelector(".weatherForm");
const apiKey = "";
const card = document.querySelector(".card");
const titleCard = document.querySelector(".titleCard");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city) {
        try {
        const weatherData = await getWeatherData(city);
        displayWeatherInfo(weatherData);
        }
        catch(error) {
            console.log(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city.")
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {

    const {
        name: city,
        main: {temp, humidity},
        wind: {speed},
        weather: [{description, id}]
    } = data;

    console.log(data);

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const iconDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const detailsDisplay = document.createElement("div");

    cityDisplay.textContent = (city === "Magugpo Poblacion" ? "Tagum City" : city); 
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    iconDisplay.textContent = getWeatherIcon(id);
    descDisplay.textContent = description.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    detailsDisplay.innerHTML = `
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${speed}m/s</p>`;

    cityDisplay.classList.add("city");
    tempDisplay.classList.add("temp");
    descDisplay.classList.add("description");
    detailsDisplay.classList.add("details");
    iconDisplay.classList.add("icon");

    card.append(iconDisplay);
    card.append(tempDisplay);
    card.append(cityDisplay);
    card.append(descDisplay);
    card.append(detailsDisplay);
}

function getWeatherIcon(weatherId) {
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default: 
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    titleCard.innerHTML = `
            <h1>Weather API</h1>
            <p>Search for a City</p>`;
    card.append(titleCard);
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}