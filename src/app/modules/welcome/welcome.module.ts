import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { WelcomeRoutes } from './welcome.routing';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(WelcomeRoutes)
  ]
})
export class WelcomeModule { }
