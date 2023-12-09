import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

export const routes: Routes = [
  { path: '', component: SettingsComponent, children: [] }
];

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class SettingsModule {

  public static routes = routes;

}
