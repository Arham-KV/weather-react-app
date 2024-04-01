import React, { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';
import humidityIcon from '../Assets/humidity.png';

const WeatherApp = () => {
    const apiKey = '8c19e23802bd2762456bf6455e224867';
    const [weatherIcon, setWeatherIcon] = useState(cloudIcon);
    const [errorMessage, setErrorMessage] = useState('');

    const search = async () => {
        const cityInput = document.querySelector('.cityInput');
        if (cityInput.value === '') {
            setErrorMessage('Please enter a city name.');
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching weather data.');
            }
            const data = await response.json();

            const humidityElement = document.querySelector('.humidity-percent');
            const windElement = document.querySelector('.wind-rate');
            const temperatureElement = document.querySelector('.weather-temp h2');
            const locationElement = document.querySelector('.weather-location p');

            humidityElement.textContent = `${data.main.humidity}%`;
            windElement.textContent = `${data.wind.speed} km/h`;
            temperatureElement.textContent = `${data.main.temp}°C`;
            locationElement.textContent = data.name;

            updateWeatherIcon(data.weather[0].main);
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Error fetching weather data. Please try again later.');
        }
    };

    const updateWeatherIcon = (weatherMain) => {
        switch (weatherMain) {
            case '01d':
            case '01n':
                setWeatherIcon(clearIcon);
                break;
            case '02d':
            case '02n':
                setWeatherIcon(cloudIcon);
                break;
            case '03d':
            case '03n':
                setWeatherIcon(drizzleIcon);
                break;
            case '04d':
            case '04n':
                setWeatherIcon(drizzleIcon);
                break;
            case '09d':
            case '09n':
                setWeatherIcon(rainIcon);
                break;
            case '10d':
            case '10n':
                setWeatherIcon(rainIcon);
                break;
            case '13d':
            case '13n':
                setWeatherIcon(snowIcon);
                break;
            default:
                setWeatherIcon(clearIcon);
                break;
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="enter any city" />
                <div className="search-icon" onClick={search}>
                    <img src={searchIcon} alt="search_icon" />
                </div>
            </div>
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
            )}
            <div className="weather-info">
                <img className="img-size" src={weatherIcon} alt="weather_icon" />
                <div className="weather-temp">
                    <h2>10°C</h2>
                </div>
                <div className="weather-location">
                    <p>New York</p>
                </div>
            </div>
            <div className="wind-info">
                <div className="humidity">
                    <img src={humidityIcon} className="icon" alt="" />
                    <div className="data">
                        <div className="humidity-percent">
                            <span>47%</span>
                        </div>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="humidity">
                    <img src={windIcon} className="icon" alt="" />
                    <div className="data">
                        <div className="wind-rate">
                            <span>5.14 km/h</span>
                        </div>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;