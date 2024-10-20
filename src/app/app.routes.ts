import { Routes } from '@angular/router';
import { StepsComponent } from './steps/steps.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: StepsComponent,
  },
];
