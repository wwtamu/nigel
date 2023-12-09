import { ipcMain } from 'electron';
import { store } from '../store';

export const initSettings = () => {

  ipcMain.on('get-setting', async (event: any, key: string) => {
    try {
      event.returnValue = store.get(key);
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('set-setting', async (event: any, key: string, value: any) => {
    try {
      event.returnValue = store.set(key, value);
    } catch (err) {
      throw err;
    }
  });

}
