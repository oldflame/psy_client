import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ToastService, TOAST_TYPE } from '../../../../services/toast.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PushMessageService } from 'src/app/services/push-message.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  isLoginLoading = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private pushMessageService: PushMessageService
  ) {}

  ngOnInit() {}

  login() {
    this.isLoginLoading = true;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (res: boolean) => {
          this.isLoginLoading = false;
          if (res) {
            this.toastService.showToast(
              `Welcome, ${this.authService.getUserData().firstName}`,
              TOAST_TYPE.SUCCESS
            );
            this.pushMessageService.requestPermission(this.authService.getUserData()._id);

            this.router.navigate(['/welcome']);
          }
        },
        (err: HttpErrorResponse) => {
          this.isLoginLoading = false;
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
      );
  }
}
