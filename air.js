/*const response = await fetch(`${apiUrl}?city=${city}`, {
    headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN'
    }
});
*/
    // Get references to DOM elements
    const cityName = document.querySelector('.city');
    const pm25Value = document.querySelectorAll('.parameter-value')[0];
    const pm10Value = document.querySelectorAll('.parameter-value')[1];
    const no2Value = document.querySelectorAll('.parameter-value')[2];
    const coValue = document.querySelectorAll('.parameter-value')[3];

    // Your custom API URL (replace with your actual API endpoint)
    const apiUrl = 'https://your-api-url.com/air-quality'; // Replace with your actual API URL

    // Fetch air quality data based on the city name
    async function getAirQualityData(city) {
        try {
            // Call your API to get air quality data for the given city
            const response = await fetch(`${apiUrl}?city=${city}`);
            
            if (!response.ok) {
                throw new Error('City not found or API error');
            }

            const data = await response.json();

            // Check if the data contains required air quality data
            if (!data || !data.airQuality) {
                alert('Invalid data returned from the API');
                return;
            }

            // Display air quality data on the page
            cityName.textContent = data.cityName; // Assuming your API returns 'cityName'
            pm25Value.textContent = `${data.airQuality.pm25 || 'Data not available'} µg/m³`;
            pm10Value.textContent = `${data.airQuality.pm10 || 'Data not available'} µg/m³`;
            no2Value.textContent = `${data.airQuality.no2 || 'Data not available'} µg/m³`;
            coValue.textContent = `${data.airQuality.co || 'Data not available'} ppm`;

        } catch (error) {
            console.error('Error fetching air quality data:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    // Default city to show air quality data on load (you can change 'Karnataka, India' to any other city)
    getAirQualityData('Karnataka, India'); // Replace with the default city name you want to show

