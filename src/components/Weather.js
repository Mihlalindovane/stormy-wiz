import React from 'react';

const Weather = ({ data }) => {
  return (
    <div className="weather-container">
      <h2>{data.name}</h2>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Weather: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
    </div>
  );
};

export default Weather;
