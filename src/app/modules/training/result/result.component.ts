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
  trainingSession;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private router: Router
  ) {}

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
        this.trainingSession = res;
      });
  }
}
