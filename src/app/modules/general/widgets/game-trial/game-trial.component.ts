import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrialStep } from 'src/app/models/trial-step';
import { SWIPE_ACTION } from '../../../../constants';
import { ToastService, TOAST_TYPE } from '../../../../services/toast.service';
import { ResponseTime } from 'src/app/models/response-time';

@Component({
  selector: 'game-trial',
  templateUrl: './game-trial.component.html',
  styleUrls: ['./game-trial.component.scss'],
})
export class GameTrialComponent implements OnInit {
  @Output('trialEnd') trialEnd = new EventEmitter();

  currentStep: number;

  startTime: number;
  endTime: number;

  swipeAction = SWIPE_ACTION;
  userAction: SWIPE_ACTION;

  userResonseTimes: ResponseTime = {
    swipeUp: -1,
    swipeDown: -1,
    swipeSide: -1
  };

  trialSteps: TrialStep[] = [
    {
      imgUrl: '../../../../../assets/img/trial/positive.png',
      gestureIcon: '../../../../../assets/img/trial/swipe_up.svg',
      gestureAnimationClass: 'animate__slideOutUp animate__infinite',
      instruction: 'Swipe up on images with purple backgrounds quickly.',
    },
    {
      imgUrl: '../../../../../assets/img/trial/negative.png',
      gestureIcon: '../../../../../assets/img/trial/swipe_down.svg',
      gestureAnimationClass: 'animate__slideOutDown animate__infinite',
      instruction: 'Swipe down on the images with red backgrounds quickly.',
    },
    {
      imgUrl: '../../../../../assets/img/trial/neutral.png',
      gestureIcon: '../../../../../assets/img/trial/side_swipe.svg',
      gestureAnimationClass: 'animate__slideOutRight animate__infinite',
      instruction:
        'Swipe sideways on the image quickly if the image has an unmatched background color.',
    },
  ];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {}

  swipeUp() {
    console.log('Swiped Up');
    this.userAction = this.swipeAction.UP;
    this.endTime = performance.now();
  }

  swipeDown() {
    console.log('Swiped Down');
    this.userAction = this.swipeAction.DOWN;
    this.endTime = performance.now();
  }

  swipeLeft() {
    console.log('Swiped Left');
    this.userAction = this.swipeAction.LEFT;
    this.endTime = performance.now();
  }

  swipeRight() {
    console.log('Swiped Right');
    this.userAction = this.swipeAction.RIGHT;
    this.endTime = performance.now();
  }

  animationDone(event: AnimationEvent) {
    console.log('Animation done', event);

    if (event.target['id'] == 'trial-img') {

      if (this.evaluateResponse()) {
        if (this.currentStep == 2) {
          this.trialEnd.emit(this.userResonseTimes);
        } else {
          this.currentStep =
            this.currentStep < 3 ? this.currentStep + 1 : this.currentStep;
        }
      }

      this.endTime =null;
      this.userAction = null;
      this.startTime = performance.now();
    }
  }

  evaluateResponse(): boolean {
    let response = false;

    switch (this.userAction) {
      case SWIPE_ACTION.UP:
        if (this.currentStep == 0) {
          response = true;
          this.userResonseTimes.swipeUp = this.endTime - this.startTime;
        }
        break;

      case SWIPE_ACTION.DOWN:
        if (this.currentStep == 1) {
          response = true;
          this.userResonseTimes.swipeDown = this.endTime - this.startTime;
        }
        break;

      case SWIPE_ACTION.LEFT:
      case SWIPE_ACTION.RIGHT:
        if (this.currentStep == 2) {
          response = true;
          this.userResonseTimes.swipeSide = this.endTime - this.startTime;
        }
        break;

      default:
        response = false;
        break;
    }

    if (response) {
      this.toastService.showToast(
        'Wohoo! Correct response.',
        TOAST_TYPE.SUCCESS
      );
    } else {
      this.toastService.showToast(
        'Oops! That does not look correct. Try again!',
        TOAST_TYPE.DANGER
      );
    }

    return response;
  }

  beginGame() {
    this.currentStep = 0;
    this.startTime = performance.now();
  }
}
