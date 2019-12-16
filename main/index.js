// Native
const { join } = require('path');
const { format } = require('url');

// Packages
const { BrowserWindow, app, ipcMain } = require('electron');
const prepareNext = require('electron-next');

const windowStateKeeper = require('electron-window-state');
const isDev = require('electron-is-dev');

let mainWindow;

// Prepare the renderer once the app is ready
const createWindow = async () => {
  if (mainWindow === undefined) {
    await prepareNext('./renderer');
  }

  // Set default window dimensions
  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 800,
  });

  // Create main window
  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000/start'
    : format({
        pathname: join(__dirname, '../renderer/start.html'),
        protocol: 'file:',
        slashes: true,
      });

  mainWindow.loadURL(url);

  // Remember window state
  mainWindowState.manage(mainWindow);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
