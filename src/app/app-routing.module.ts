import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { WelcomeModule } from './modules/welcome/welcome.module';
import { TrainingModule } from './modules/training/training.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () => WelcomeModule,
        canActivate: [AuthGuardService],
      },
      {
        path: 'play',
        loadChildren: () => TrainingModule,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => AuthLayoutModule,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
