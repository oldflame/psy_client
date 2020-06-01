import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { DataService } from "./data.service";
import { AUTH_API, HTTP_RESPONSE_STATUS } from "../constants";
import { map, catchError } from "rxjs/operators";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { SecureStorageService } from "./secure-storage.service";
import { Router } from "@angular/router";
import { User } from '../models/user';
import { RegisterUserParams } from '../models/request-params';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authSubject = new BehaviorSubject(null);
  auth$: Observable<User> = this.authSubject.asObservable();

  constructor(
    private dataService: DataService,
    private secureStorageService: SecureStorageService,
    private router: Router
  ) {
    if (this.getUserData()) {
      this.authSubject.next(this.getUserData());
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const reqBody = { email, password };

    return this.dataService.sendPOST(AUTH_API.LOGIN, reqBody).pipe(
      map(
        (res: HttpResponse<any>) => {
          if (res.status == HTTP_RESPONSE_STATUS.OK) {
            this.authSubject.next(res.body.user);
            this.secureStorageService.setValue("at", res.body.token);
            this.secureStorageService.setValue("ud", res.body.user);
          } else {
            this.authSubject.next(null);
          }
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          this.authSubject.next(null);
          return of(false);
        })
      )
    );
  }

  register(requestBody: RegisterUserParams): Observable<boolean> {
    return this.dataService.sendPOST(AUTH_API.REGISTER, requestBody).pipe(
      map(
        (res: HttpResponse<any>) => {
          return res.status == HTTP_RESPONSE_STATUS.OK;
        },
        catchError((err: HttpErrorResponse) => {
          return of(false);
        })
      )
    );
  }

  logout(): boolean {
    this.secureStorageService.clearStorage();
    this.router.navigate(['/login']);
    return true;
  }

  getUserData(): User {
    return this.secureStorageService.getValue('ud') as User
  }

  isAuthenticated(): boolean {
    return this.secureStorageService.getValue("at") !== "";
  }
}
