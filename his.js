// Select elements
const filterDropdown = document.querySelector('.filter-dropdown');
const historyGrid = document.querySelector('.history-grid');
const graphContainer = document.querySelector('.graph-container');

// Your API endpoint (replace with your actual API URL)
const apiUrl = 'https://your-api-url.com/weather-history'; // Replace with your actual API URL

// Function to fetch and display weather history data
async function fetchWeatherHistory(timeframe) {
    try {
        // Fetch the weather history data from your API
        const response = await fetch(`${apiUrl}?timeframe=${timeframe}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather history');
        }

        const data = await response.json();
        if (!data || !data.history || data.history.length === 0) {
            alert('No data available for the selected timeframe.');
            return;
        }

        // Clear current history cards
        historyGrid.innerHTML = '';

        // Add new history cards to the grid
        data.history.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('history-card');

            card.innerHTML = `
                <div class="history-date">${item.date}</div>
                <div class="history-details">
                    <div class="detail-item">
                        <div class="detail-label">Temperature</div>
                        <div class="detail-value">${item.temperature}°C</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">PM2.5</div>
                        <div class="detail-value">${item.pm25} µg/m³</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">PM10</div>
                        <div class="detail-value">${item.pm10} µg/m³</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">NO₂</div>
                        <div class="detail-value">${item.no2} µg/m³</div>
                    </div>
                </div>
            `;
            historyGrid.appendChild(card);
        });

        // Generate temperature graph
        generateTemperatureGraph(data.history);

    } catch (error) {
        console.error('Error fetching weather history:', error);
        alert('An error occurred while fetching the weather history.');
    }
}

// Function to generate the temperature trend graph using Chart.js
function generateTemperatureGraph(history) {
    const dates = history.map(item => item.date);
    const temperatures = history.map(item => item.temperature);

    // Create a canvas element for the graph if it doesn't exist
    if (!graphContainer.querySelector('canvas')) {
        const canvas = document.createElement('canvas');
        graphContainer.appendChild(canvas);
    }

    const ctx = graphContainer.querySelector('canvas').getContext('2d');

    // Create the chart
    new Chart(ctx, {
        type: 'line', // Line chart for temperature trend
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                fill: false,
                borderColor: '#0077B6',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                    beginAtZero: false // Adjust this depending on your temperature range
                }
            }
        }
    });
}

// Event listener for filter dropdown
filterDropdown.addEventListener('change', (event) => {
    const timeframe = event.target.value;
    fetchWeatherHistory(timeframe);
});

// Initial fetch for default timeframe (Last 7 Days)
fetchWeatherHistory('7days');
