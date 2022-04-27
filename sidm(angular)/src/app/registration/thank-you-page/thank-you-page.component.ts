import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate, Location } from '@angular/common'

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css']
})
export class ThankYouPageComponent implements OnInit {
  type:any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
    this.type=this.route.snapshot.paramMap.get('params')
   }

  ngOnInit(): void {
  }

  registerdUser() {
    this.router.navigate(['/login/member'])
  }
  goBack(){
    this.location?.back();

  }
}
