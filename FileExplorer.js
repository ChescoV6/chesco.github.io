import React, { useState, useEffect } from 'react';
import { getFiles, createFile, createFolder, deleteItem } from '../lib/FileSystem';

const FileExplorer = ({ addNotification }) => {
  const [files, setFiles] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('file');
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    setFiles(getFiles());
  }, []);

  const handleCreate = (e) => {
    if (e.key === 'Enter' && newItemName) {
      if (newItemType === 'file') createFile(newItemName);
      else createFolder(newItemName);
      setFiles(getFiles());
      addNotification(`Created ${newItemName} (${newItemType})`);
      setNewItemName('');
    }
  };

  const handleDelete = (name) => {
    deleteItem(name);
    setFiles(getFiles());
    setSelectedFolder(null);
    addNotification(`Deleted ${name}`);
  };

  const handleDragStart = (file) => {
    setDraggedItem(file);
  };

  const handleDrop = (target) => {
    if (draggedItem && target.type === 'folder') {
      addNotification(`Moved ${draggedItem.name} into ${target.name}`);
      setDraggedItem(null);
    }
  };

  const navigateFolder = (folderName) => {
    setSelectedFolder(folderName === selectedFolder ? null : folderName);
  };

  return (
    <div className="window-content">
      <h2 className="text-sm font-medium mb-2 text-white">File Explorer</h2>
      <div className="mb-2 flex space-x-1">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyPress={handleCreate}
          placeholder="New item"
          className="border border-gray-600 bg-gray-800 text-white rounded-md p-1 w-2/3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={newItemType}
          onChange={(e) => setNewItemType(e.target.value)}
          className="border border-gray-600 bg-gray-800 text-white rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="file">File</option>
          <option value="folder">Folder</option>
        </select>
      </div>
      <ul className="space-y-1 max-h-60 overflow-y-auto">
        {files
          .filter((file) => !selectedFolder || (file.type === 'folder' && file.name === selectedFolder))
          .map((file, index) => (
            <li
              key={index}
              draggable
              onDragStart={() => handleDragStart(file)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(file)}
              onClick={() => file.type === 'folder' && navigateFolder(file.name)}
              className={`p-1 rounded-md flex justify-between items-center hover:bg-gray-700/10 transition-all duration-200 ${draggedItem === file ? 'opacity-50' : ''} ${selectedFolder === file.name ? 'bg-blue-600/10' : ''}`}
            >
              <span className="flex items-center">
                {file.type === 'folder' ? '📁' : '📄'} <span className="ml-1 text-xs">{file.name}</span>
              </span>
              <button
                onClick={() => handleDelete(file.name)}
                className="text-red-400 hover:text-red-500 text-xs"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FileExplorer;