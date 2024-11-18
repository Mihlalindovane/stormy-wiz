import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ setCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    // Fetch city suggestions
    if (input.length > 2) {
      axios
        .get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
          params: { namePrefix: input },
          headers: {
            'X-RapidAPI-Key': '9db62803d3msh980f7268f5d44b9p131a5ajsn553f9a21f092', // Directly embedding the API key
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          },
        })
        .then((response) => {
          const cities = response.data.data.map((city) => city.city);
          setSuggestions(cities.slice(0, 5)); // Limit to top 5 suggestions
        })
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleCityClick = (city) => {
    setCity(city);
    setQuery(''); // Clear input
    setSuggestions([]); // Clear suggestions
  };

  const handleSearchClick = () => {
    if (query.trim() === '') return; // Prevent empty searches
    setCity(query);
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter city..."
        className="search-input"
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
      <ul className="suggestions-list">
        {suggestions.map((city, index) => (
          <li key={index} onClick={() => handleCityClick(city)}>
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
