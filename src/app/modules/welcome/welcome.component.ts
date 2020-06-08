import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { WELCOME_SLIDES_COUNT } from '../../constants';
import { ResponseTime } from 'src/app/models/response-time';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  activeSlide = 0;
  isCarouselAnimated = false;
  carouselIndicator = true;
  carouselInterval = false;
  showContinue = true;
  displayTrialResult = false;

  userResponseTimes: ResponseTime;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  nextSlide() {
    if (this.activeSlide == WELCOME_SLIDES_COUNT - 2) {
      this.showContinue = false;
    }
    this.activeSlide = this.activeSlide < WELCOME_SLIDES_COUNT - 1 ? this.activeSlide + 1 : this.activeSlide;
  }

  showTrialResults(results: ResponseTime) {
    console.log('Trial results: ', results);
    this.userResponseTimes = results;
    this.showContinue = true;
    this.displayTrialResult = true;
  }
}
