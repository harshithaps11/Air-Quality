// Your API Key
const apiKey = 'DAPQ4KAAQM5TYDFX2OP6NBGELFLHJ6DHU5NA';

// Elements
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');
const cityNameElement = document.querySelector('.city');
const temperatureElement = document.querySelector('.temperature');
const weatherDescriptionElement = document.querySelector('.weather-description');
const weatherDetails = document.querySelector('.weather-details');

// Function to fetch weather data from API
async function getWeatherData(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert('City not found');
            return;
        }

        // Extract weather data
        const { name, main, weather, wind, air_quality } = data;

        // Update the UI with weather data
        cityNameElement.textContent = name;
        temperatureElement.textContent = `${main.temp}°C`;
        weatherDescriptionElement.textContent = weather[0].description;

        // PM2.5, PM10, Nitrogen Dioxide, Carbon Monoxide (using placeholder values here)
        const pm25 = '12 µg/m³'; // placeholder value
        const pm10 = '25 µg/m³'; // placeholder value
        const nitrogenDioxide = '40 µg/m³'; // placeholder value
        const carbonMonoxide = '0.8 ppm'; // placeholder value

        // Update weather details
        updateWeatherDetails(pm25, pm10, nitrogenDioxide, carbonMonoxide);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Something went wrong! Please try again later.');
    }
}

// Function to update the weather details grid
function updateWeatherDetails(pm25, pm10, nitrogenDioxide, carbonMonoxide) {
    const detailItems = [
        { label: 'PM2.5', value: pm25 },
        { label: 'PM10', value: pm10 },
        { label: 'Nitrogen Dioxide', value: nitrogenDioxide },
        { label: 'Carbon Monoxide', value: carbonMonoxide },
    ];

    // Clear existing weather details
    weatherDetails.innerHTML = '';

    // Add new detail items
    detailItems.forEach(item => {
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('detail-item');

        const label = document.createElement('div');
        label.classList.add('detail-label');
        label.textContent = item.label;

        const value = document.createElement('div');
        value.classList.add('detail-value');
        value.textContent = item.value;

        detailDiv.appendChild(label);
        detailDiv.appendChild(value);
        weatherDetails.appendChild(detailDiv);
    });
}

// Event listener for search button click
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

// Event listener for enter key press
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    }
});

// Initialize with a default city (optional)
getWeatherData('London');
