import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain } from 'electron';
import { Connection, createConnection } from 'typeorm';
import { Project } from '../app/core/model/project.schema';
import { store } from '../store';
import { initFiles } from './files';
import { initProjects } from './projects';
import { initSettings } from './settings';

app.allowRendererProcessReuse = true;

let window: BrowserWindow;

const createWindow = async () => {

  const databaseSettings = store.get('databaseSettings');
  const connection: Connection = await createConnection(Object.assign(databaseSettings, {
    entities: [Project]
  }));

  const windowOptions = store.get('windowOptions');
  window = new BrowserWindow(Object.assign(windowOptions, {
    webPreferences: {
      nodeIntegration: true
    }
  }));

  window.setMenuBarVisibility(false);

  window.setIcon(path.join(__dirname, `/../../dist/favicon.ico`));

  if (process.argv.indexOf('--serve') >= 2) {
    window.loadURL('http://localhost:4200/index.html');
  } else {
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, `/../../dist/index.html`),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (store.get('devTools')) {
    window.webContents.openDevTools();
  }

  window.webContents.on('devtools-opened', () => {
    store.set('devTools', true);
  });

  window.webContents.on('devtools-closed', () => {
    store.set('devTools', false);
  });

  window.on('resize', () => {
    const { width, height } = window.getBounds();
    store.set('windowOptions.height', height);
    store.set('windowOptions.width', width);
  });

  window.on('move', (event: any) => {
    const { x, y } = event.sender.getBounds();
    store.set('windowOptions.x', x);
    store.set('windowOptions.y', y);
  });

  window.on('closed', () => {
    window = null;
    store.set('settings.ready', false);
  });

  initSettings();

  initFiles(window);

  initProjects(connection);

  ipcMain.on('exit', async (event: any, args: any[]) => {
    window.close();
  });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
