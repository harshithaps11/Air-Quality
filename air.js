// Your API Key for OpenWeatherMap Air Pollution API
const apiKey = 'DAPQ4KAAQM5TYDFX2OP6NBGELFLHJ6DHU5NA';

// Elements
const cityNameElement = document.querySelector('.city');
const pm25Element = document.querySelector('.parameter:nth-child(1) .parameter-value');
const pm10Element = document.querySelector('.parameter:nth-child(2) .parameter-value');
const nitrogenDioxideElement = document.querySelector('.parameter:nth-child(3) .parameter-value');
const carbonMonoxideElement = document.querySelector('.parameter:nth-child(4) .parameter-value');

// Function to fetch air quality data from API
async function getAirQualityData(city) {
    try {
        // Geocoding API to get latitude and longitude for the city
        const geoResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const geoData = await geoResponse.json();
        
        if (geoData.cod === '404') {
            alert('City not found');
            return;
        }

        const { lat, lon } = geoData.coord;

        // Fetch air quality data using latitude and longitude
        const airQualityResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const airQualityData = await airQualityResponse.json();

        if (airQualityData.cod !== 200) {
            alert('Air quality data could not be fetched.');
            return;
        }

        // Extract the air quality parameters
        const { pm2_5, pm10, no2, co } = airQualityData.list[0].components;

        // Update the UI with air quality data
        cityNameElement.textContent = geoData.name + ', ' + geoData.sys.country;
        pm25Element.textContent = `${pm2_5} µg/m³`;
        pm10Element.textContent = `${pm10} µg/m³`;
        nitrogenDioxideElement.textContent = `${no2} µg/m³`;
        carbonMonoxideElement.textContent = `${co} ppm`;

    } catch (error) {
        console.error('Error fetching air quality data:', error);
        alert('Something went wrong! Please try again later.');
    }
}

// Initialize with a default city (optional)
getAirQualityData('Bangalore, India');

// You can also set up search functionality if you want users to enter a city
