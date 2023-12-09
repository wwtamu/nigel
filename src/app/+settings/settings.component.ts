import { Component } from '@angular/core';
import { SettingsService } from '../core/service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private settings: SettingsService) {

  }

  getSettings(): any[] {
    return this.settings.getAll();
  }

  updateSetting(key, value): void {
    this.settings.set(key, value);
  }

}
