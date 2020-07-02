import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'goodbye',
  templateUrl: './goodbye.component.html',
  styleUrls: ['./goodbye.component.scss']
})
export class GoodbyeComponent implements OnInit {

  showContinue = true;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
