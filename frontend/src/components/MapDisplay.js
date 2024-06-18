import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import SearchedRestaurantsForm from './SearchedRestaurantsForm';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 12.9716,
  lng: 77.5946
};

const MapDisplay = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [restaurants, setRestaurants] = useState([]);
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants');
        setRestaurants(response.data);
        if (response.data.length > 0) {
          // Optionally re-center the map to the first restaurant
          setMapCenter({
            lat: response.data[0].location.coordinates[0],
            lng: response.data[0].location.coordinates[1]
          });
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);



  console.log(restaurants," restaurants in map display component");

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDcLOtFbsyUad0tfJ-GpDGvpCvz4YaUNCg"
    >
      <SearchedRestaurantsForm setSearchedRestaurants={setSearchedRestaurants} searchedRestaurants={searchedRestaurants} /> 
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            position={{
              lat: restaurant.location.coordinates[0],
              lng: restaurant.location.coordinates[1]
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
