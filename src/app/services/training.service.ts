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

  checkOngoingTraining() {
    return this.dataService.sendGET(TRAINING_API.GET_ONGOING_TRAINING).pipe(
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

  startTrainingSession() {
    return this.dataService.sendGET(TRAINING_API.START_TRAINING_SESSION).pipe(
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

  endTrainingSession() {
    return this.dataService.sendGET(TRAINING_API.END_TRAINING_SESSION).pipe(
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

  findTrainingById(trainingId: string) {
    return this.dataService
      .sendGET(
        TRAINING_API.FIND_TRAINING_BY_ID.replace('{trainingId}', trainingId)
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

  findTrainingSessionById(sessionId: string) {
    return this.dataService
      .sendGET(
        TRAINING_API.FIND_SESSION_BY_ID.replace('{sessionId}', sessionId)
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
    return this.dataService
      .sendGET(
        TRAINING_API.GET_IMAGES_BY_CATEGORY.replace('{categoryId}', categoryId)
          .replace('{count}', count.toString())
          .replace('{type}', type.toString())
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

  updateTrainingResponse(sessionId: string, responses: any[]) {
    return this.dataService
      .sendPUT(
        TRAINING_API.UPDATE_TRAINING_RESPONSE.replace('{sessionId}', sessionId), {responses}
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
}
