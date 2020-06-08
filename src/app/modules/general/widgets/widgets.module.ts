import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameTrialComponent } from './game-trial/game-trial.component';
import { HammerModule } from '@angular/platform-browser';
import { MaterialModule } from '../../../material.module';



@NgModule({
  declarations: [GameTrialComponent],
  imports: [
    CommonModule,
    HammerModule,
    MaterialModule
  ],
  exports: [GameTrialComponent]
})
export class WidgetsModule { }
