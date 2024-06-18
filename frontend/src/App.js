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

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
