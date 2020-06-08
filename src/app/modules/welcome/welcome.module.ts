import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { WelcomeRoutes } from './welcome.routing';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { WidgetsModule } from '../general/widgets/widgets.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(WelcomeRoutes),
    CarouselModule.forRoot(),
    WidgetsModule
  ],
})
export class WelcomeModule {}
