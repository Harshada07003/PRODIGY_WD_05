
 async function getWeather(city) {
    if (!city) {
        city = 'Ratnagiri';
    }

    const apiKey = "your apikey";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById('weatherInfo').innerHTML = `
                <img src="${iconUrl}" alt="Weather icon">
                <h2>Weather in ${data.name}</h2>
                <h3>${data.main.temp}°C</h3>
                <h4>${data.weather[0].description}</h4>
                <p>Humidity:<br>${data.main.humidity}%</p>
                <p>Wind Speed:<br> ${data.wind.speed} m/s</p>`;
        } else {
            document.getElementById('weatherInfo').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('weatherInfo').innerHTML = `<p>Error fetching data. Please try again.</p>`;
    }
}

window.onload = () => {
    getWeather();
};
