import React, { useState } from 'react';
import axios from 'axios';

const SearchedRestaurantsForm = ({setSearchedRestaurants}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [locality, setLocality] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Searching restaurants:', name, location, locality);
      const response = await axios.post('/api/restaurants/searched', {
         name, location, locality 
      });
      setSearchedRestaurants(response.data);
      setName('');
      setLocation('');
      setLocality('');
    } catch (error) {
      console.error('Error searching restaurants:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Latitude, Longitude:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <label>Locality:</label>
        <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} />
      </div>
      <button type="submit">Search Restaurants</button>
    </form>
  );
};

export default SearchedRestaurantsForm;
