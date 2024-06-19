// scripts.js

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

function fetchWeatherData(location) {
    const apiKey = 'API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    if (data.cod === 200) {
        const { name, weather, main, wind } = data;
        weatherInfo.innerHTML = `
            <p><strong>Location:</strong> ${name}</p>
            <p><strong>Weather:</strong> ${weather[0].description}</p>
            <p><strong>Temperature:</strong> ${main.temp}°C</p>
            <p><strong>Humidity:</strong> ${main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
}
