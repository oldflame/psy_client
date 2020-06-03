import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService, TOAST_TYPE } from '../../../../services/toast.service';
import { AuthService } from '../../../../services/auth.service';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { Router } from '@angular/router';
import {
  GENDER,
  GENDER_TYPES,
  RACE_TYPES,
  ETHNICITY_TYPES,
} from '../../../../constants';
import { DATE_PICKER_FORMAT } from '../../../../constants';
import * as moment from 'moment';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMAT },
  ],
})
export class RegisterComponent implements OnInit {
  birthdateDefault = moment().subtract(18, 'year');
  maxBirthdate = moment().subtract(2, 'year');

  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    retypePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    gender: new FormControl('', [Validators.required]),
    birthdate: new FormControl(this.birthdateDefault, [Validators.required]),
    race: new FormControl('', [Validators.required]),
    ethnicity: new FormControl('', [Validators.required]),
  });

  genderTypes = GENDER_TYPES.map((type) => type);
  raceTypes = RACE_TYPES.map((type) => type);
  ethnicityTypes = ETHNICITY_TYPES.map((type) => type);

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  matchPasswords() {
    if (this.registrationForm.invalid) {
      if (
        this.registrationForm.get('password').touched &&
        this.registrationForm.get('retypePassword').touched &&
        this.registrationForm.value.password !=
          this.registrationForm.value.retypePassword
      ) {
        this.toastService.showToast(
          'Passwords do not match!',
          TOAST_TYPE.DANGER
        );
        return false;
      }
    }
    return true;
  }

  registerAdmin() {
    if (!this.matchPasswords()) {
      return false;
    }

    this.authService
      .register(this.registrationForm.value)
      .subscribe((res: boolean) => {
        if (res) {
          this.toastService.showToast(
            'Registration successful. Login to the app now!',
            TOAST_TYPE.SUCCESS
          );
          this.router.navigate(['/login']);
        } else {
          this.toastService.showToast(
            'Registration failed. Try again!',
            TOAST_TYPE.DANGER
          );
        }
      });
  }

  isMobileDisplay() {
    return window.screen.width <= 576;
  }
}
