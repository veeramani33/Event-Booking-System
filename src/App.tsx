import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import EventBooking from './components/EventBooking';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 bg-gray-800 text-white py-1 px-3 rounded-lg"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <EventBooking />
    </div>
);
}

export default App;
