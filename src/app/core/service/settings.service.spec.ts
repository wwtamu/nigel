import { TestBed } from '@angular/core/testing';
import { ElectronService } from 'ngx-electron';
import { MockElectronService } from '../mock/electron.service';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ElectronService, useClass: MockElectronService }
      ]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
