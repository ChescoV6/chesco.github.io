import React, { useState } from 'react';
import FileExplorer from './FileExplorer';

const Window = ({ id, app, minimized, closeWindow, toggleMinimize }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleDrag = (e) => {
    setPosition({
      x: position.x + e.movementX,
      y: position.y + e.movementY,
    });
  };

  return (
    <div
      className={`window ${minimized ? 'hidden' : ''}`}
      style={{ top: position.y, left: position.x, width: '400px', height: '300px' }}
    >
      <div className="window-header" onMouseDown={(e) => e.target.parentElement.draggable = true} onDrag={handleDrag}>
        <span>{app.name}</span>
        <div>
          <button className="px-2" onClick={() => toggleMinimize(id)}>−</button>
          <button className="px-2" onClick={() => closeWindow(id)}>×</button>
        </div>
      </div>
      {app.name === 'File Explorer' && <FileExplorer />}
      {app.name === 'Notes' && <div className="window-content">Notes App (WIP)</div>}
    </div>
  );
};

export default Window;