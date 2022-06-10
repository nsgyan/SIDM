import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-member-dashboard-page',
  templateUrl: './member-dashboard-page.component.html',
  styleUrls: ['./member-dashboard-page.component.css']
})
export class MemberDashboardPageComponent implements OnInit {
  memberData:any
  constructor(private httpservice:HttpService,
    private routes:Router) {
    this.httpservice.getMemberData().subscribe((data:any)=>{
      data.map((item:any)=>{
        if (item.category === 'cat1') {
          item.category = 'C1 '
        }
        else if (item.category === 'cat2') {
          item.category = 'C2'
        }
        else if (item.category === 'cat3') {
          item.category = 'C3'
        }
        else {
          item.category = 'C4'
        }
        if (item.typeOfApplicant === 'L') {
          item.typeOfApplicant = 'Large'
        }
        else if (item.typeOfApplicant === 'M') {
          item.typeOfApplicant = 'Medium'
        }
        else {
          item.typeOfApplicant = 'SME/SSI/START-UP'
        }
        const format = 'dd-MMM-yy';
        const locale = 'en-US';
        item.createAt = formatDate(item.createAt, format, locale)
      })
      console.log(data);
      this.memberData=data;
      
    })
   }

  ngOnInit(): void {
  }
  navigateTo(url:string,id:string){
  

    url=url+id
    window.location.href=url
  }
  


navigate(url:any){
  this.routes.navigateByUrl(url);
}

}
