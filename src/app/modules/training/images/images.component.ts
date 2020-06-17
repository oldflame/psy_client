import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';
import { TrainingService } from '../../../services/training.service';
import { ToastService, TOAST_TYPE } from '../../../services/toast.service';
import { Image } from '../../../models/image';
import { HttpErrorResponse } from '@angular/common/http';
import { SWIPE_ACTION } from 'src/app/constants';
import { TrainingImagesResponse } from '../../../models/response-time';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  @Input('imageCategory') imageCategory: Category;
  @Input('imageType') imageType: number;
  @Input('imageCount') imageCount: number;

  @Output('responseSubmit') responseSubmit = new EventEmitter();

  images: Image[];

  currentImageIndex: number;

  startTime: number;
  endTime: number;

  swipeAction = SWIPE_ACTION;
  userAction: SWIPE_ACTION;

  responseTimes: TrainingImagesResponse[] = [];

  constructor(
    private trainingService: TrainingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.trainingService
      .getImagesByCategory(
        this.imageCategory._id,
        this.imageCount,
        this.imageType
      )
      .subscribe(
        (images: Image[]) => {
          this.images = images;
        },
        (err) => {
          console.log('Error', err);
          this.toastService.showToast(err.msg, TOAST_TYPE.DANGER);
        }
      );
  }

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
      this.evaluateResponse()
        if (this.currentImageIndex == this.images.length - 1) {
          this.responseSubmit.emit({responses: this.responseTimes});
        } else {
          this.currentImageIndex =
            this.currentImageIndex < this.images.length
              ? this.currentImageIndex + 1
              : this.currentImageIndex;
        }

      this.endTime = null;
      this.userAction = null;
      this.startTime = performance.now();
    }
  }

  evaluateResponse(): boolean {
    let response = false;

    switch (this.userAction) {
      case SWIPE_ACTION.UP:
        if (this.images[this.currentImageIndex].imageType < 0) {
          response = true;
        }
        break;

      case SWIPE_ACTION.DOWN:
        if (this.images[this.currentImageIndex].imageType > 0) {
          response = true;
        }
        break;

      case SWIPE_ACTION.LEFT:
      case SWIPE_ACTION.RIGHT:
        if (this.images[this.currentImageIndex].imageType == 0) {
          response = true;
        }
        break;

      default:
        response = false;
        break;
    }

    this.responseTimes.push({
      imageId: this.images[this.currentImageIndex]._id,
      url: this.images[this.currentImageIndex].url,
      time: this.endTime - this.startTime,
      isCorrect: response
    });

    if (response) {
      this.toastService.showToast(
        'Wohoo! Correct response.',
        TOAST_TYPE.SUCCESS
      );
    } else {
      this.toastService.showToast(
        'Oops! That did not look correct.',
        TOAST_TYPE.DANGER
      );
    }

    return response;
  }

  beginGame() {
    this.currentImageIndex = 0;
    this.startTime = performance.now();
  }
}
