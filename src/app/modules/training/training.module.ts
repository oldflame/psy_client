import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { RouterModule } from '@angular/router';
import { TrainingRoutes } from './training.routing';
import { HammerModule } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TrainingRoutes),
    HammerModule,
    MaterialModule,
    FormsModule
  ]
})
export class TrainingModule { }
