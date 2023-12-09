import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  constructor(private electron: ElectronService) {

  }

  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
      this.electron.ipcRenderer.once('get-files-response', (event, arg) => {
        resolve(arg);
      });
      this.electron.ipcRenderer.send('get-files');
    });
  }

}
