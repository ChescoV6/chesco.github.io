import React from 'react';

const Taskbar = ({ windows, toggleMinimize }) => {
  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white flex items-center p-2">
      <div className="flex-1 flex space-x-2">
        {windows.map((win) => (
          <button
            key={win.id}
            className={`px-4 py-2 rounded ${win.minimized ? 'bg-gray-600' : 'bg-gray-700'} hover:bg-gray-500`}
            onClick={() => toggleMinimize(win.id)}
          >
            {win.app.name}
          </button>
        ))}
      </div>
      <div className="text-sm">ChescoOS v1.0</div>
    </div>
  );
};

export default Taskbar;