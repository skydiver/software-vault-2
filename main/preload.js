const { ipcRenderer } = require('electron');
const base64Img = require('base64-img');

const ElectronStore = require('./electron-store');

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer;
  global.STORE = new ElectronStore();
  global.base64Img = base64Img;
});
