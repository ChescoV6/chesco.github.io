import React, { useState, useEffect, useRef } from 'react';
import FileExplorer from './FileExplorer';
import Terminal from './Terminal';
import Settings from './Settings';
import Calculator from './Calculator';
import TextEditor from './TextEditor';
import Browser from './Browser';
import MusicPlayer from './MusicPlayer';
import ImageViewer from './ImageViewer';
import Clock from './Clock';
import Weather from './Weather';

const Window = ({ id, app, minimized, closeWindow, toggleMinimize, bringToFront, zIndex, theme, highContrast, addNotification }) => {
  const [position, setPosition] = useState({ x: 80, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 400, height: 300 });
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const { width, height } = contentRef.current.getBoundingClientRect();
      setSize({
        width: Math.min(window.innerWidth - 40, Math.max(240, width + 32)),
        height: Math.min(window.innerHeight - 50, Math.max(150, height + 50)),
      });
    }
  }, [app.name]);

  const handleDragStart = (e) => {
    setIsDragging(true);
    bringToFront(id);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - size.width, position.x + e.movementX)),
        y: Math.max(0, Math.min(window.innerHeight - size.height, position.y + e.movementY)),
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleResize = (e) => {
    if (isResizing) {
      setSize({
        width: Math.max(240, size.width + e.movementX),
        height: Math.max(150, size.height + e.movementY),
      });
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const snapToEdge = (e) => {
    if (e.shiftKey && isDragging) {
      const edgeThreshold = 30;
      const newX = position.x < edgeThreshold ? 0 : position.x + size.width > window.innerWidth - edgeThreshold ? window.innerWidth - size.width : position.x;
      const newY = position.y < edgeThreshold ? 0 : position.y + size.height > window.innerHeight - edgeThreshold ? window.innerHeight - size.height : position.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const renderAppContent = () => {
    switch (app.name) {
      case 'File Explorer':
        return <FileExplorer addNotification={addNotification} />;
      case 'Terminal':
        return <Terminal />;
      case 'Settings':
        return <Settings />;
      case 'Calculator':
        return <Calculator />;
      case 'Text Editor':
        return <TextEditor />;
      case 'Browser':
        return <Browser />;
      case 'Music Player':
        return <MusicPlayer />;
      case 'Image Viewer':
        return <ImageViewer />;
      case 'Clock':
        return <Clock />;
      case 'Weather':
        return <Weather />;
      default:
        return <div className="window-content">Unknown App</div>;
    }
  };

  return (
    <div
      className={`window ${minimized ? 'hidden' : ''} ${theme === 'dark' ? 'dark' : ''} ${highContrast ? 'high-contrast' : ''}`}
      style={{ top: position.y, left: position.x, width: size.width, height: size.height, zIndex }}
      onMouseDown={handleDragStart}
      onMouseMove={(e) => { handleDrag(e); handleResize(e); snapToEdge(e); }}
      onMouseUp={() => { handleDragEnd(); handleResizeEnd(); }}
      onMouseLeave={() => { handleDragEnd(); handleResizeEnd(); }}
    >
      <div className="window-header">
        <span className="text-sm">{app.name}</span>
        <div className="flex space-x-1">
          <button className="px-1 text-yellow-300 hover:text-yellow-400 text-sm" onClick={() => toggleMinimize(id)}>−</button>
          <button className="px-1 text-red-500 hover:text-red-600 text-sm" onClick={() => closeWindow(id)}>×</button>
        </div>
      </div>
      <div className="window-content" ref={contentRef}>
        {renderAppContent()}
      </div>
      <div
        className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500/20 cursor-se-resize rounded"
        onMouseDown={handleResizeStart}
      />
    </div>
  );
};

export default Window;