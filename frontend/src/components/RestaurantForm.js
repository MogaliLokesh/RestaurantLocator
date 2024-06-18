import React, { useState } from 'react';
import axios from 'axios';

const RestaurantForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [locality, setLocality] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/restaurants', { name, location, locality });
      setName('');
      setLocation('');
      setLocality('');
    } catch (error) {
      console.error('Error adding restaurant:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Latitude, Longitude:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>
      <div>
        <label> Locality </label>
        <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} required />
      </div>
      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default RestaurantForm;
