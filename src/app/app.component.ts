import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from "@angular/router";
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PushMessageService } from './services/push-message.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private pushMessageService: PushMessageService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.pushMessageService.requestPermission(this.authService.getUserData()._id);
  }
}
