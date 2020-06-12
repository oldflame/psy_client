import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TRAINING_API, HTTP_RESPONSE_STATUS } from '../constants';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private dataService: DataService) {}

  getRandomTraining() {
    return this.dataService.sendGET(TRAINING_API.GET_RANDOM_TRAINING).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == HTTP_RESPONSE_STATUS.OK) {
          return res.body;
        }
        return null;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error);
      })
    );
  }
}
