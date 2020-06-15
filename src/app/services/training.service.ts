import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TRAINING_API, HTTP_RESPONSE_STATUS } from '../constants';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Training } from '../models/trainings';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private dataService: DataService) {}

  getRandomTraining(): Observable<Training> {
    return this.dataService.sendGET(TRAINING_API.GET_RANDOM_TRAINING).pipe(
      map((res: HttpResponse<Training>) => {
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

  getQuestionsByCategory(categoryId: string) {
    return this.dataService
      .sendGET(
        TRAINING_API.GET_QUESTIONS_BY_CATEGORY.replace(
          '{questioncategory}',
          categoryId
        )
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            return res.body;
          }
          return [];
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err.error);
        })
      );
  }

  getImagesByCategory(categoryId: string, count: number, type: number) {
    return this.dataService.sendGET(
      TRAINING_API.GET_IMAGES_BY_CATEGORY.replace(
        '{categoryId}',
        categoryId
      ).replace('{count}', count.toString()).replace('{type}', type.toString())
    ).pipe(map((res: HttpResponse<any>) => {
      if (res.status == HTTP_RESPONSE_STATUS.OK) {
        return res.body;
      }
      return [];
    }),
    catchError((err: HttpErrorResponse) => {
      return throwError(err.error);
    }));
  }
}
