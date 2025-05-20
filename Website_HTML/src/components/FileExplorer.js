import React, { useState } from 'react';

const FileExplorer = () => {
  const [files] = useState([
    { name: 'Documents', type: 'folder' },
    { name: 'Readme.txt', type: 'file' },
  ]);

  return (
    <div className="window-content">
      <h2 className="text-lg font-bold">File Explorer</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
            {file.type === 'folder' ? '📁' : '📄'} {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;