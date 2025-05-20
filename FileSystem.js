const initFileSystem = () => {
  if (!localStorage.getItem('chescoOS_files')) {
    const initialFiles = [
      { name: 'Documents', type: 'folder' },
      { name: 'Readme.txt', type: 'file' },
      { name: 'Image.jpg', type: 'file' },
      { name: 'Music.mp3', type: 'file' },
    ];
    localStorage.setItem('chescoOS_files', JSON.stringify(initialFiles));
  }
};

const getFiles = () => {
  return JSON.parse(localStorage.getItem('chescoOS_files') || '[]');
};

const createFile = (name) => {
  const files = getFiles();
  if (!files.some((f) => f.name === name)) {
    files.push({ name, type: 'file' });
    localStorage.setItem('chescoOS_files', JSON.stringify(files));
  }
};

const createFolder = (name) => {
  const files = getFiles();
  if (!files.some((f) => f.name === name)) {
    files.push({ name, type: 'folder' });
    localStorage.setItem('chescoOS_files', JSON.stringify(files));
  }
};

const deleteItem = (name) => {
  const files = getFiles().filter((file) => file.name !== name);
  localStorage.setItem('chescoOS_files', JSON.stringify(files));
};

export { initFileSystem, getFiles, createFile, createFolder, deleteItem };