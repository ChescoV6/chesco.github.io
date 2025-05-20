import React, { useState, useEffect } from 'react';

const Desktop = ({ openWindow, wallpaper, setWallpaper, setTheme, theme, setHighContrast, highContrast, setFontScale, fontScale, suggestedApp, handleVoiceCommand }) => {
  const apps = [
    { name: 'File Explorer', icon: '📁', shortcut: true },
    { name: 'Terminal', icon: '💻', shortcut: true },
    { name: 'Settings', icon: '⚙️', shortcut: true },
    { name: 'Calculator', icon: '🧮', shortcut: true },
    { name: 'Text Editor', icon: '📝', shortcut: true },
    { name: 'Browser', icon: '🌐', shortcut: true },
    { name: 'Music Player', icon: '🎵', shortcut: true },
    { name: 'Image Viewer', icon: '🖼️', shortcut: true },
    { name: 'Clock', icon: '⏰', shortcut: true },
  ];

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleWallpaperChange = () => {
    setWallpaper(`https://source.unsplash.com/random/1920x1080/?holographic,${Date.now()}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const adjustFontScale = (delta) => {
    setFontScale(Math.max(0.8, Math.min(1.5, fontScale + delta)));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'F1') openWindow({ name: 'File Explorer', icon: '📁' });
    if (e.key === 'T') openWindow({ name: 'Terminal', icon: '💻' });
    if (e.key === 'S') openWindow({ name: 'Settings', icon: '⚙️' });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div
      className="h-full bg-cover bg-center transition-colors duration-300 relative"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
    >
      <div className="grid grid-cols-3 gap-4 p-4 absolute inset-4 place-content-center">
        {apps.map((app) =>
          app.shortcut && (
            <div
              key={app.name}
              className="flex flex-col items-center text-white cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-all duration-200 hover:shadow-[0_0_8px_rgba(30,64,175,0.3)]"
              onClick={() => openWindow(app)}
            >
              <span className="text-3xl mb-1">{app.icon}</span>
              <span className="text-xs font-medium text-center">{app.name}</span>
            </div>
          )
        )}
      </div>
      {suggestedApp && (
        <div className="absolute top-4 left-4 bg-blue-600/30 text-white p-2 rounded-md shadow">
          Suggested: {suggestedApp} <button onClick={() => openWindow({ name: suggestedApp, icon: '🌐' })} className="ml-1 text-white underline">Open</button>
        </div>
      )}
      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div className="context-menu-item" onClick={handleWallpaperChange}>
            Change Wallpaper
          </div>
          <div className="context-menu-item" onClick={toggleTheme}>
            Toggle Theme
          </div>
          <div className="context-menu-item" onClick={toggleHighContrast}>
            Toggle High Contrast
          </div>
          <div className="context-menu-item" onClick={() => adjustFontScale(0.1)}>
            Increase Font
          </div>
          <div className="context-menu-item" onClick={() => adjustFontScale(-0.1)}>
            Decrease Font
          </div>
          <div className="context-menu-item" onClick={() => handleVoiceCommand('open Settings')}>
            Voice Command
          </div>
          <div className="context-menu-item" onClick={() => openWindow({ name: 'Settings', icon: '⚙️' })}>
            Open Settings
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;