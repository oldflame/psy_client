import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { TrainingService } from '../../../services/training.service';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  avgResponseTime;
  accuracy;
  results;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private router: Router
  ) {
    this.avgResponseTime = 0;
    this.accuracy = 0.0;
  }

  showGoodbye() {
    this.router.navigate(['/goodbye']);
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params: any) => {
          if (params && params.q) {
            return this.trainingService.findTrainingSessionById(params.q);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        let correctCount = 0;
        let totalCount = 0;

        if (res) {
          this.results = res.responses;
        }
         res.responses.forEach(element => {
          if(element.actionType==0){ element.responses.forEach(ele => {
              if (ele.isCorrect == true) { 
                correctCount += 1; 
              }
              totalCount += 1;
              this.avgResponseTime += ele.time;
          });}
        });
        this.avgResponseTime = this.avgResponseTime / totalCount;
        this.accuracy = (correctCount/totalCount) * 100;
      });
  }


}
