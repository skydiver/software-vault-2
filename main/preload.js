const { ipcRenderer } = require('electron');
const ElectronStore = require('./electron-store');

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer;
  global.STORE = new ElectronStore();
});
