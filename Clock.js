import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="window-content text-center">
      <h2 className="text-sm font-medium mb-2 text-white">Clock</h2>
      <div className="text-lg text-white">{time.toLocaleTimeString()}</div>
      <div className="text-xs text-gray-400 mt-1">{time.toLocaleDateString()}</div>
    </div>
  );
};

export default Clock;