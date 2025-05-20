import React from 'react';

const StartMenu = ({ openWindow, closeMenu }) => {
  const apps = [
    { name: 'File Explorer', icon: '📁' },
    { name: 'Terminal', icon: '💻' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Calculator', icon: '🧮' },
    { name: 'Text Editor', icon: '📝' },
    { name: 'Browser', icon: '🌐' },
    { name: 'Music Player', icon: '🎵' },
    { name: 'Image Viewer', icon: '🖼️' },
    { name: 'Clock', icon: '⏰' },
    { name: 'Weather', icon: '🌤️' },
  ];

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-48 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow p-2">
      <div className="grid grid-cols-2 gap-1">
        {apps.map((app) => (
          <button
            key={app.name}
            className="flex flex-col items-center p-1 rounded-md hover:bg-white/10 transition-all duration-200"
            onClick={() => {
              openWindow(app);
              closeMenu();
            }}
          >
            <span className="text-xl">{app.icon}</span>
            <span className="text-xs text-white font-medium">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartMenu;