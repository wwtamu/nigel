import { TestBed } from '@angular/core/testing';
import { ElectronService } from 'ngx-electron';
import { MockElectronService } from '../mock/electron.service';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElectronService, useClass: MockElectronService }
      ]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
