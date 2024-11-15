import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import Weather from './components/Weather';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Cape Town');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Access the API key from the environment variable
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Fetch weather data when city changes
  useEffect(() => {
    if (city) {
      setLoading(true);  // Show loading state
      setError(null);     // Reset error state
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeatherData(response.data);
          setLoading(false);  // Stop loading when data is fetched
        })
        .catch(error => {
          setError('City not found or API error.');
          setLoading(false);  // Stop loading on error
        });
    }
  }, [city, apiKey]);

  return (
    <div className="App">
      <h1>Stormy-Wiz</h1>
      <Search setCity={setCity} />
      {loading && <p>Loading...</p>}  {/* Show loading text */}
      {error && <p>{error}</p>}  {/* Show error message */}
      {weatherData && <Weather data={weatherData} />}  {/* Show weather data */}
    </div>
  );
}

export default App;
