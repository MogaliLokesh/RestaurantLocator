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
  const [displayRestaurants, setDisplayRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants');
        setRestaurants(response.data);
        if (response.data.length > 0) {
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

  // useEffect to update map center when searchedRestaurants change
  useEffect(() => {

    if (searchedRestaurants.length > 0) {
      setMapCenter({
        lat: searchedRestaurants[0].location.coordinates[0],
        lng: searchedRestaurants[0].location.coordinates[1]
      });

      setDisplayRestaurants(searchedRestaurants);

    }
    else {
      setMapCenter({
        lat: restaurants[0]?.location?.coordinates[0],
        lng: restaurants[0]?.location?.coordinates[1]
      });

      setDisplayRestaurants(restaurants);
    }

  }, [searchedRestaurants, restaurants]);

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
        {displayRestaurants?.map((restaurant) => (
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
