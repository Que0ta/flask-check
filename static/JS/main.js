document.getElementById('three-day-btn').addEventListener('click', () => fetchWeather(3));
document.getElementById('seven-day-btn').addEventListener('click', () => fetchWeather(7));

async function fetchWeather(days) {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        alert('Будь ласка, введіть місто!');
        return;
    }

    try {
        const response = await fetch(`/weather?city=${encodeURIComponent(city)}&days=${days}`);
        if (!response.ok) {
            throw new Error('Не вдалося отримати дані. Перевірте назву міста.');
        }
        
        const data = await response.json();
        if (!data || !data.city || !data.temperature || !data.description) {
            alert('Некоректні дані від сервера.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error('Помилка:', error);
        alert('Щось пішло не так при завантаженні даних погоди!');
    }
}

function displayWeather(data) {
    const weatherDataContainer = document.getElementById('forecast-container');
    if (!weatherDataContainer) {
        console.error('Елемент forecast-container не знайдено!');
        return;
    }

    weatherDataContainer.innerHTML = `
        <h3>${data.city}</h3>
        <p>Температура: ${data.temperature}°C</p>
        <p>Опис: ${data.description}</p>
        <p>Вологість: ${data.humidity}%</p>
        <p>Вітер: ${data.wind} м/с</p>
        <img src="http://openweathermap.org/img/wn/${data.icon}.png" alt="${data.description}">
    `;
}


