import React, { useState } from 'react';

const ImageViewer = () => {
  const images = [
    'https://source.unsplash.com/random/800x600/?nature',
    'https://source.unsplash.com/random/800x600/?city',
    'https://source.unsplash.com/random/800x600/?space',
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="window-content">
      <h2 className="text-sm font-medium mb-2 text-white">Image Viewer</h2>
      <img
        src={currentImage}
        alt="Viewer"
        className="w-full h-48 object-cover rounded-md mb-1"
      />
      <div className="flex flex-wrap gap-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(img)}
            className={`px-1 py-1 rounded-md text-white ${currentImage === img ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 text-xs`}
          >
            Image {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;