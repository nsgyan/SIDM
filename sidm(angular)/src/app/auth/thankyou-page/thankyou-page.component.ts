import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styleUrls: ['./thankyou-page.component.css']
})
export class ThankyouPageComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  registerdUser() {
    this.router.navigate(['/member'])
  }
}
