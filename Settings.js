import React from 'react';

const Settings = ({ setTheme, setWallpaper, theme, setHighContrast, highContrast, setFontScale, fontScale }) => {
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    document.querySelector('.h-screen').className = `h-screen overflow-hidden transition-colors duration-500 ${e.target.value === 'dark' ? 'bg-gradient-to-br from-gray-800 to-blue-900' : 'bg-gradient-to-br from-gray-100 to-blue-200'} ${highContrast ? 'contrast-200 brightness-110' : ''}`;
  };

  const handleWallpaperChange = () => {
    setWallpaper(`https://source.unsplash.com/random/1920x1080/?holographic,${Date.now()}`);
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const adjustFontScale = (delta) => {
    setFontScale(Math.max(0.8, Math.min(1.5, fontScale + delta)));
  };

  return (
    <div className="window-content">
      <h2 className="text-sm font-medium mb-2 text-white">Settings</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-gray-400 text-xs">Theme</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="border border-gray-600 bg-gray-800 text-white rounded-md p-1 w-full text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs">Wallpaper</label>
          <button
            onClick={handleWallpaperChange}
            className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-all duration-200 text-xs"
          >
            Change
          </button>
        </div>
        <div>
          <label className="block text-gray-400 text-xs">High Contrast</label>
          <button
            onClick={toggleHighContrast}
            className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-all duration-200 text-xs"
          >
            {highContrast ? 'Disable' : 'Enable'}
          </button>
        </div>
        <div>
          <label className="block text-gray-400 text-xs">Font Size</label>
          <div className="flex space-x-1">
            <button
              onClick={() => adjustFontScale(0.1)}
              className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-all duration-200 text-xs"
            >
              +
            </button>
            <button
              onClick={() => adjustFontScale(-0.1)}
              className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-all duration-200 text-xs"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;