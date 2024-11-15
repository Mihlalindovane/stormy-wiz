import React, { useState } from 'react';

const Search = ({ setCity }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setCity(input); // Set the city state in the parent component
      setInput('');   // Clear the input field
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter city..." 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
