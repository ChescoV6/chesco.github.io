import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('0');
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];

  return (
    <div className="window-content">
      <h2 className="text-sm font-medium mb-2 text-white">Calculator</h2>
      <div className="text-right p-1 bg-gray-800 rounded-md text-white mb-1 text-xs">{display}</div>
      <div className="grid grid-cols-4 gap-1">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className="p-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-all duration-200 text-xs"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;