import React, { useState } from 'react';

const TextEditor = () => {
  const [text, setText] = useState(localStorage.getItem('chescoOS_note') || '');

  const handleSave = () => {
    localStorage.setItem('chescoOS_note', text);
    alert('Note saved!');
  };

  return (
    <div className="window-content">
      <h2 className="text-sm font-medium mb-2 text-white">Text Editor</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-1 border border-gray-600 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
        placeholder="Write here..."
      />
      <button
        onClick={handleSave}
        className="mt-1 bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-all duration-200 text-xs"
      >
        Save
      </button>
    </div>
  );
};

export default TextEditor;