const Store = require('electron-store');
const electron = require('electron');
const isDev = require('electron-is-dev');

class ElectronStore {
  constructor() {
    const options = {};
    // if (!isDev) {
    //   options.name = 'serials-database';
    //   options.cwd = electron.remote.app.getPath('documents');
    // }
    this.STORE = new Store(options);
  }

  read(param) {
    return this.STORE.get(param);
  }

  store(param, value) {
    this.STORE.set(param, value);
  }

  remove(param) {
    this.STORE.delete(param);
  }
}

module.exports = ElectronStore;
