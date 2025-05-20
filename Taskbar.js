import React, { useState } from 'react';
import StartMenu from './StartMenu';

const Taskbar = ({ windows, toggleMinimize, theme, openWindow }) => {
  const [showStartMenu, setShowStartMenu] = useState(false);

  return (
    <div className={`fixed bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 p-1 rounded-xl bg-gray-900/70 backdrop-blur-sm shadow ${theme === 'light' ? 'bg-gray-100/70' : ''}`}>
      <button
        className="px-3 py-1 rounded-lg bg-blue-600/40 hover:bg-blue-500/40 text-white text-xs font-medium transition-all duration-200"
        onClick={() => setShowStartMenu(!showStartMenu)}
      >
        Start
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="w-1/4 p-1 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
        onKeyPress={(e) => {
          if (e.key === 'Enter') openWindow({ name: e.target.value, icon: '🌐' });
        }}
      />
      {windows.map((win) => (
        <button
          key={win.id}
          className={`px-3 py-1 rounded-lg ${win.minimized ? 'bg-gray-600/20' : 'bg-blue-600/20'} hover:bg-blue-500/20 text-white text-xs font-medium transition-all duration-200`}
          onClick={() => toggleMinimize(win.id)}
        >
          {win.app.name}
        </button>
      ))}
      <div className="px-3 py-1 text-white text-xs font-medium">ChescoOS v2.7</div>
      {showStartMenu && (
        <StartMenu openWindow={openWindow} closeMenu={() => setShowStartMenu(false)} />
      )}
    </div>
  );
};

export default Taskbar;