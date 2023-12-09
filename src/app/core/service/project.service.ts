import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../model/project.schema';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(private electron: ElectronService) {

  }

  getProjects(): Observable<Project[]> {
    return of(this.electron.ipcRenderer.sendSync('get-projects'))
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  addProject(oroject: Project): Observable<Project[]> {
    return of(this.electron.ipcRenderer.sendSync('add-project', oroject))
      .pipe(catchError((error: any) => throwError(error.json)));
  }

  deleteProject(oroject: Project): Observable<Project[]> {
    return of(this.electron.ipcRenderer.sendSync('delete-project', oroject))
      .pipe(catchError((error: any) => throwError(error.json)));
  }

}
