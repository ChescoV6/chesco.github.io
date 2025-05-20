import React from 'react';

const Desktop = ({ openWindow }) => {
  const apps = [
    { name: 'File Explorer', icon: '📁' },
    { name: 'Notes', icon: '📝' },
  ];

  return (
    <div className="h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?space)' }}>
      <div className="grid grid-cols-6 gap-4 p-4">
        {apps.map((app) => (
          <div
            key={app.name}
            className="flex flex-col items-center text-white cursor-pointer hover:bg-gray-700 p-2 rounded"
            onClick={() => openWindow(app)}
          >
            <span className="text-4xl">{app.icon}</span>
            <span className="mt-2">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desktop;