import { ipcMain, BrowserWindow } from 'electron';
import * as fs from 'fs';

export const initFiles = (window: BrowserWindow) => {

  ipcMain.on('get-files', (event: any, ...args: any[]) => {
    const files = fs.readdirSync(__dirname);
    window.webContents.send('get-files-response', files);
  });

}
