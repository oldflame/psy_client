import { Routes } from '@angular/router';
import { GoodbyeComponent } from './goodbye.component';

export const GoodbyeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GoodbyeComponent,
      },
    ],
  },
];
