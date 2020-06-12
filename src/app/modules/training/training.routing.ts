import { Routes } from '@angular/router';
import { TrainingComponent } from './training.component';

export const TrainingRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TrainingComponent,
      },
    ],
  },
];
