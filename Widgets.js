import React from 'react';

const Widgets = ({ theme, openWindow }) => {
  return (
    <div className="fixed top-2 left-2 flex flex-col space-y-1">
      <div className="widget text-white p-1">
        <h3 className="text-xs font-medium">Quick Actions</h3>
        <button onClick={() => openWindow({ name: 'File Explorer', icon: '📁' })} className="block mt-1 text-blue-300 text-xs hover:underline">Files</button>
        <button onClick={() => openWindow({ name: 'Browser', icon: '🌐' })} className="block mt-1 text-blue-300 text-xs hover:underline">Browser</button>
      </div>
      <div className="widget text-white p-1">
        <h3 className="text-xs font-medium">Notes</h3>
        <p className="mt-1 text-xs">Last: "Zeta rules!"</p>
        <button onClick={() => openWindow({ name: 'Text Editor', icon: '📝' })} className="mt-1 text-blue-300 text-xs hover:underline">Edit</button>
      </div>
    </div>
  );
};

export default Widgets;