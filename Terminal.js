import React, { useState } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Welcome to ChescoOS Terminal! Type "help" for commands.']);

  const commands = {
    help: 'Commands: dir, clear, echo <text>, whoami, time, date, weather',
    dir: () => {
      const files = JSON.parse(localStorage.getItem('chescoOS_files') || '[]');
      return files.map((f) => f.name).join('  ') || 'No files';
    },
    clear: () => {
      setOutput([]);
      return '';
    },
    echo: (text) => text || 'echo <text>',
    whoami: 'Alpha, ruler of Zeta!',
    time: () => new Date().toLocaleTimeString(),
    date: () => new Date().toLocaleDateString(),
    weather: () => 'Sunny, 72°F',
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const [cmd, ...args] = input.trim().split(' ');
      let result = `Error: "${cmd}" not recognized`;
      if (commands[cmd]) {
        result = typeof commands[cmd] === 'function' ? commands[cmd](args.join(' ')) : commands[cmd];
      }
      setOutput([...output, `> ${input}`, result]);
      setInput('');
    }
  };

  return (
    <div className="window-content font-mono text-xs">
      <div className="h-40 overflow-y-auto bg-gray-900/80 text-green-400 p-1 rounded-md">
        {output.map((line, index) => (
          <div key={index} className="mb-1">{line}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleCommand}
        className="w-full p-1 bg-gray-800/80 text-green-400 border-t border-gray-700 rounded-b-md focus:outline-none focus:ring-1 focus:ring-green-500"
        autoFocus
      />
    </div>
  );
};

export default Terminal;