import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService, TOAST_TYPE } from '../../services/toast.service';
import { TrainingsMapper } from '../../utils/training.mapper';
import { TrainingStep } from '../../models/training-step';
import { TRAINING_ACTION_TYPE } from '../../constants';
import { Router } from '@angular/router';
import { Training } from 'src/app/models/trainings';
import * as _ from 'lodash';

@Component({
  selector: 'training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  training: any;
  currentStepIndex = -1;
  currentStep: TrainingStep;
  disableGame = true;

  trainingActionType = TRAINING_ACTION_TYPE;

  activeTrainingId: string;
  activeSessionId: string;

  trainingResponse: any[] = [];

  constructor(
    private trainingService: TrainingService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainingService.checkOngoingTraining().subscribe(
      (res) => {
        if (res && res.ongoingSession) {
          this.activeTrainingId = res.ongoingSession.trainingId;
          this.activeSessionId = res.ongoingSession._id;
        }
        console.log('training', this.training);
        this.disableGame = false;
      },
      (err: HttpErrorResponse) => {
        this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
      }
    );
  }

  stepForward() {
    this.currentStepIndex++;
    if (this.currentStepIndex < this.training.steps.length) {
      this.currentStep = this.training.steps[this.currentStepIndex];
    } else {
      this.endSession();
    }
  }

  startSession() {
    if (this.activeTrainingId) {
      this.trainingService
        .findTrainingById(this.activeTrainingId)
        .subscribe((training: Training) => {
          console.log('Session', training);
          this.training = TrainingsMapper.mapTrainingDataForUI(training);
          this.stepForward();
        });
    } else {
      this.trainingService.startTrainingSession().subscribe((res) => {
        console.log('Session', res);
        this.training = TrainingsMapper.mapTrainingDataForUI(res.training);
        this.activeSessionId = res.session._id;
        this.stepForward();
      });
    }
  }

  endSession() {
    this.trainingService.endTrainingSession().subscribe(() => {
      this.router.navigate(['/play/result'], {
        queryParams: { q: this.activeSessionId },
      });
    });
  }

  handleResponse(eventArgs, actionType: TRAINING_ACTION_TYPE) {
    console.log('Questionnaire response: ', eventArgs);
    this.trainingResponse[this.currentStepIndex] = _.merge(
      { actionType },
      eventArgs
    );
    console.log('Responses', this.trainingResponse);
    this.trainingService
      .updateTrainingResponse(this.activeSessionId, this.trainingResponse)
      .subscribe((res) => {
        console.log('Updated session', res);
        this.stepForward();
      });
  }
}
