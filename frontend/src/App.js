import React from 'react';
import RestaurantForm from './components/RestaurantForm';
import MapDisplay from './components/MapDisplay';

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-200'>
      <h1>Restaurant Locator</h1>
      <RestaurantForm />
      <MapDisplay />
    </div>
  );
};

export default App;
