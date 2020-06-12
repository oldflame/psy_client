import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  training: any;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.getRandomTraining().subscribe(training => {
      console.log("training", training);
      this.training = training;
    })
  }

}
