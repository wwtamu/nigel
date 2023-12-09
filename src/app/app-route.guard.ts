import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SettingsService } from './core/service/settings.service';

@Injectable()
export class AppRouteGuard implements CanActivate {

  constructor(
    private settings: SettingsService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const ready = this.settings.get('ready');
    const knownRoute = this.settings.get('route');
    if (ready) {
      return true;
    } else {
      this.settings.set('ready', true);
      if (state.url === knownRoute) {
        return true;
      } else {
        this.router.navigate([knownRoute]);
        return false;
      }
    }
  }

}
