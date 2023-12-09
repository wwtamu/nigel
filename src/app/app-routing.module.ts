import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteGuard } from './app-route.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./+dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { label: 'Dashboard' },
    canActivate: [AppRouteGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./+settings/settings.module').then(m => m.SettingsModule),
    data: { label: 'Settings' },
    canActivate: [AppRouteGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
