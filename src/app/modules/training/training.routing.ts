import { Routes } from '@angular/router';
import { TrainingComponent } from './training.component';
import { ResultComponent } from './result/result.component';
import { ResultsGuardService } from '../../services/results-guard.service';

export const TrainingRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TrainingComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
        canActivate: [ResultsGuardService]
      },
    ],
  },
];
