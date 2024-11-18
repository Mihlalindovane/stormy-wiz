import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import Weather from './components/Weather';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]); // For 4-day forecast
  const [city, setCity] = useState('Cape Town');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Access the API key from the environment variable
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Fetch weather data when city changes
  useEffect(() => {
    if (city) {
      setLoading(true); // Show loading state
      setError(null); // Reset error state
      // Fetch current weather data
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch(() => {
          setError('City not found or API error.');
        });

      // Fetch 4-day forecast data
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          // Extract forecast data for the next 4 days (skip 3-hour intervals)
          const dailyForecast = response.data.list.filter((item, index) =>
            index % 8 === 0
          );
          setForecastData(dailyForecast.slice(1, 5)); // Next 4 days
        })
        .catch(() => {
          setError('Error fetching forecast data.');
        })
        .finally(() => {
          setLoading(false); // Stop loading when both API calls finish
        });
    }
  }, [city, apiKey]);

  return (
    <div className="App">
      <h1>Stormy-Wiz</h1>
      <Search setCity={setCity} />
      {loading && <p>Loading...</p>} {/* Show loading text */}
      {error && <p>{error}</p>} {/* Show error message */}
      {weatherData && <Weather data={weatherData} />} {/* Show weather data */}

      {/* Forecast Section */}
      <div className="forecast-container">
        {forecastData.map((forecast, index) => (
          <div key={index} className="forecast-block">
            <p className="forecast-date">
              {new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
              className="forecast-icon"
            />
            <p className="forecast-temp">{Math.round(forecast.main.temp)}°C</p>
            <p className="forecast-description">{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
