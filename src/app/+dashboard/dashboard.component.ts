import { Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsService } from '../core/service/settings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  private gridByBreakpoint = { xl: 6, lg: 4, md: 2, sm: 2, xs: 1 };

  cols = this.mediaObserver.asObservable().pipe(
    map((change: MediaChange[]) => this.gridByBreakpoint[change[0].mqAlias])
  );

  cards = of([]);

  constructor(
    private mediaObserver: MediaObserver,
    private settings: SettingsService
  ) {

  }

  getSetting(key: string): any {
    return this.settings.get(key);
  }

  updateSetting(key: string, value: any): void {
    this.settings.set(key, value);
  }

}
