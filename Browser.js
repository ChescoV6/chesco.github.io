import React, { useState } from 'react';

const Browser = () => {
  const [url, setUrl] = useState('https://example.com');
  const [currentUrl, setCurrentUrl] = useState(url);
  const [history, setHistory] = useState([]);

  const handleGo = (e) => {
    if (e.key === 'Enter') {
      setHistory([...history, currentUrl]);
      setCurrentUrl(url);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevUrl = history[history.length - 1];
      setCurrentUrl(prevUrl);
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <div className="window-content">
      <h2 className="text-sm font-medium mb-2 text-white">Browser</h2>
      <div className="flex space-x-1 mb-1">
        <button
          onClick={goBack}
          className="bg-gray-700 text-white px-1 py-1 rounded-md hover:bg-gray-600 text-xs"
          disabled={history.length === 0}
        >
          Back
        </button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleGo}
          className="w-full p-1 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
          placeholder="Enter URL"
        />
        <button
          onClick={() => { setHistory([...history, currentUrl]); setCurrentUrl(url); }}
          className="bg-blue-600 text-white px-1 py-1 rounded-md hover:bg-blue-700 text-xs"
        >
          Go
        </button>
      </div>
      <iframe
        src={currentUrl}
        className="w-full h-48 border border-gray-600 rounded-md"
        title="Browser"
      />
    </div>
  );
};

export default Browser;