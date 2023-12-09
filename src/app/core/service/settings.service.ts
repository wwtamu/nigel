import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  constructor(private electron: ElectronService) {

  }

  getAll(): any {
    return this.electron.ipcRenderer.sendSync('get-setting', 'settings');
  }

  get(key: string): any {
    return this.electron.ipcRenderer.sendSync('get-setting', `settings.${key}`);
  }

  set(key: string, value: any): any {
    return this.electron.ipcRenderer.sendSync('set-setting', `settings.${key}`, value);
  }

}
