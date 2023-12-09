import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChildActivationEnd, Data, NavigationEnd, Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { SettingsService } from '../core/service/settings.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @ViewChild(MatSidenav)
  public sidenav: MatSidenav;

  public data: Observable<Data>;

  public isTablet: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private settings: SettingsService,
    private electron: ElectronService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.data = this.router.events.pipe(
      filter(event => event instanceof ChildActivationEnd),
      filter((event: ChildActivationEnd) => event.snapshot.data.label),
      map((event: ChildActivationEnd) => event.snapshot.data)
    );
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => this.settings.set('route', event.url)),
      filter(() => this.sidenav.mode === 'over'),
      filter(() => this.sidenav.opened),
      tap(() => this.sidenav.toggle())
    ).toPromise().finally();
  }

  getSidenavPosition(): string {
    return this.settings.get('navigation.sidenavPosition');
  }

  exit(): void {
    this.electron.ipcRenderer.send('exit');
  }

}
