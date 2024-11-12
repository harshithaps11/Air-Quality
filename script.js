/*const response = await fetch(`${apiUrl}?city=${city}`, {
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN'
    }
});
*/

    // Get references to DOM elements
    const searchButton = document.querySelector('.search-box button');
    const cityInput = document.querySelector('.search-box input');
    const cityName = document.querySelector('.city');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const weatherDetails = document.querySelector('.weather-details');

    // Your custom API URL (replace with your actual API endpoint)
    const apiUrl = 'https://your-api-url.com/weather'; // Replace with your API URL

    // Fetch weather data based on city name
    async function getWeatherData(city) {
        try {
            // Call your API to get weather data for the given city
            const response = await fetch(`${apiUrl}?city=${city}`);
            
            if (!response.ok) {
                throw new Error('City not found or API error');
            }

            const data = await response.json();

            // Check if the data structure matches what we expect (adjust according to your API response)
            if (!data || !data.weather || !data.weather.main || !data.weather.description) {
                alert('Invalid data returned from the API');
                return;
            }

            // Display weather data on the page
            cityName.textContent = data.weather.cityName; // Assuming your API returns 'cityName'
            temperature.textContent = `${Math.round(data.weather.main.temp)}°C`;
            weatherDescription.textContent = data.weather.description;

            // Update the weather details (air quality, etc.)
            const detailsHtml = `
                <div class="detail-item">
                    <div class="detail-label">PM2.5</div>
                    <div class="detail-value">${data.airQuality.pm25 || 'Data not available'} µg/m³</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">PM10</div>
                    <div class="detail-value">${data.airQuality.pm10 || 'Data not available'} µg/m³</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Nitrogen Dioxide</div>
                    <div class="detail-value">${data.airQuality.no2 || 'Data not available'} µg/m³</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Carbon Monoxide</div>
                    <div class="detail-value">${data.airQuality.co || 'Data not available'} ppm</div>
                </div>
            `;
            weatherDetails.innerHTML = detailsHtml;

        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    // Event listener for the search button
    searchButton.addEventListener('click', function () {
        const city = cityInput.value.trim();

        if (city) {
            getWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    });

    // Optional: Handle Enter key press in the search input
    cityInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Optional: Default city to show weather on load
    getWeatherData('London'); // Replace 'London' with any default city

