import React, { useState } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    name: 'Sample Track 1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  });

  const tracks = [
    { name: 'Sample Track 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Sample Track 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  ];

  return (
    <div className="window-content">
      <h2 className="text-sm font-medium mb-2 text-white">Music Player</h2>
      <div className="mb-1 text-gray-400 text-xs">Playing: {currentTrack.name}</div>
      <audio
        src={currentTrack.url}
        controls
        autoPlay={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full mb-1 rounded-md"
      />
      <div className="flex flex-wrap gap-1">
        {tracks.map((track) => (
          <button
            key={track.name}
            onClick={() => setCurrentTrack(track)}
            className={`px-1 py-1 rounded-md text-white ${currentTrack.name === track.name ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 text-xs`}
          >
            {track.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;