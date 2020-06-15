import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { RouterModule } from '@angular/router';
import { TrainingRoutes } from './training.routing';
import { HammerModule } from '@angular/platform-browser';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsComponent } from './questions/questions.component';
import { ImagesComponent } from './images/images.component';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [TrainingComponent, QuestionsComponent, ImagesComponent, ResultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TrainingRoutes),
    HammerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TrainingModule { }
