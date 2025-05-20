import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import NotificationCenter from './components/NotificationCenter';
import Widgets from './components/Widgets';
import { initFileSystem } from './lib/FileSystem';
import './App.css';

function App() {
  const [windows, setWindows] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [wallpaper, setWallpaper] = useState('https://source.unsplash.com/random/1920x1080/?holographic');
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [suggestedApp, setSuggestedApp] = useState(null);

  useEffect(() => {
    initFileSystem();
    suggestApp();
    addNotification('Welcome to ChescoOS! Explore with ease.');
  }, []);

  const suggestApp = () => {
    const apps = ['Browser', 'Music Player', 'Text Editor'];
    setSuggestedApp(apps[Math.floor(Math.random() * apps.length)]);
  };

  const addNotification = (message) => {
    setNotifications([...notifications, { id: Date.now(), message }]);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const openWindow = (app) => {
    if (!windows.find((w) => w.app.name === app.name)) {
      setWindows([...windows, { id: Date.now(), app, minimized: false, zIndex: windows.length + 1 }]);
      addNotification(`Opened ${app.name}`);
      suggestApp();
    }
  };

  const closeWindow = (id) => {
    const closedApp = windows.find((w) => w.id === id)?.app.name;
    setWindows(windows.filter((win) => win.id !== id));
    addNotification(`Closed ${closedApp}`);
  };

  const toggleMinimize = (id) => {
    setWindows(
      windows.map((win) =>
        win.id === id ? { ...win, minimized: !win.minimized } : win
      )
    );
  };

  const bringToFront = (id) => {
    setWindows(
      windows.map((win) =>
        win.id === id ? { ...win, zIndex: Math.max(...windows.map((w) => w.zIndex)) + 1 } : win
      )
    );
  };

  const handleVoiceCommand = (command) => {
    if (command.includes('open')) {
      const appName = command.split('open')[1].trim();
      openWindow({ name: appName, icon: '🌐' });
      addNotification(`Opened ${appName} via voice`);
    }
  };

  return (
    <div
      className={`h-screen overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-blue-900' : 'bg-gradient-to-br from-gray-100 to-blue-200'} ${highContrast ? 'contrast-200 brightness-110' : ''}`}
      style={{ fontSize: `${fontScale * 16}px` }}
    >
      <Desktop
        openWindow={openWindow}
        wallpaper={wallpaper}
        setWallpaper={setWallpaper}
        setTheme={setTheme}
        theme={theme}
        setHighContrast={setHighContrast}
        highContrast={highContrast}
        setFontScale={setFontScale}
        fontScale={fontScale}
        suggestedApp={suggestedApp}
        handleVoiceCommand={handleVoiceCommand}
      />
      {windows.map((win) => (
        <Window
          key={win.id}
          id={win.id}
          app={win.app}
          minimized={win.minimized}
          closeWindow={closeWindow}
          toggleMinimize={toggleMinimize}
          bringToFront={bringToFront}
          zIndex={win.zIndex}
          theme={theme}
          highContrast={highContrast}
          addNotification={addNotification}
        />
      ))}
      <Taskbar
        windows={windows}
        toggleMinimize={toggleMinimize}
        theme={theme}
        openWindow={openWindow}
      />
      <NotificationCenter
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <Widgets theme={theme} openWindow={openWindow} />
    </div>
  );
}

export default App;