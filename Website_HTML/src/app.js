import React, { useState } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import './App.css';

function App() {
  const [windows, setWindows] = useState([]);

  const openWindow = (app) => {
    setWindows([...windows, { id: Date.now(), app, minimized: false }]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((win) => win.id !== id));
  };

  const toggleMinimize = (id) => {
    setWindows(
      windows.map((win) =>
        win.id === id ? { ...win, minimized: !win.minimized } : win
      )
    );
  };

  return (
    <div className="h-screen bg-gray-900">
      <Desktop openWindow={openWindow} />
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          app={win.app}
          minimized={win.minimized}
          closeWindow={closeWindow}
          toggleMinimize={toggleMinimize}
        />
      ))}
      <Taskbar windows={windows} toggleMinimize={toggleMinimize} />
    </div>
  );
}

export default App;