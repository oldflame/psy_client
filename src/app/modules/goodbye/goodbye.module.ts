import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodbyeComponent } from './goodbye.component';
import { RouterModule } from '@angular/router';
import { GoodbyeRoutes } from './goodbye.routing';
import { MaterialModule } from '../../material.module';
import { WidgetsModule } from '../general/widgets/widgets.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [GoodbyeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(GoodbyeRoutes),
    CarouselModule.forRoot(),
    WidgetsModule
  ]
})
export class GoodbyeModule { }
