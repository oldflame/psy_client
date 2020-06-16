import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService, TOAST_TYPE } from '../../services/toast.service';
import { TrainingsMapper } from '../../utils/training.mapper';
import { TrainingStep } from '../../models/training-step';
import { TRAINING_ACTION_TYPE } from '../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  training: any;
  currentStepIndex = -1;
  currentStep: TrainingStep;
  disableGame = true;

  trainingActionType = TRAINING_ACTION_TYPE;

  constructor(private trainingService: TrainingService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.trainingService.getRandomTraining().subscribe(training => {
      this.training = TrainingsMapper.mapTrainingDataForUI(training);
      console.log("training", this.training);
      this.disableGame = false;
    }, (err: HttpErrorResponse) => {
      this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
    })
  }

  stepForward() {
    this.currentStepIndex ++;
    if (this.currentStepIndex < this.training.steps.length) {
      this.currentStep = this.training.steps[this.currentStepIndex];
    } else {
      this.router.navigate(['/play/result'])
    }
  }

  handleQuestionnaireResponse(eventArgs) {
    console.log("Questionnaire response: ", eventArgs);
    this.stepForward();
  }

  handleImagesResponse(eventArgs) {
    console.log("Images response: ", eventArgs);
    this.stepForward();
  }
}
