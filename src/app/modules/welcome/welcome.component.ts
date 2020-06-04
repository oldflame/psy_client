import { Component, OnInit } from '@angular/core';
import { WELCOME_SLIDES_COUNT } from '../../constants';

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

  constructor() {}

  ngOnInit(): void {}

  nextSlide() {
    this.activeSlide = this.activeSlide < WELCOME_SLIDES_COUNT - 1 ? this.activeSlide + 1 : this.activeSlide;
  }
}
