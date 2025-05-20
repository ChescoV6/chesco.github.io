import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState('Loading...');

  useEffect(() => {
    setTimeout(() => setWeather('Sunny, 72°F'), 1000);
  }, []);

  return (
    <div className="window-content text-center">
      <h2 className="text-sm font-medium mb-2 text-white">Weather</h2>
      <div className="text-lg text-white">{weather}</div>
      <p className="text-xs text-gray-400 mt-1">Zeta City</p>
    </div>
  );
};

export default Weather;