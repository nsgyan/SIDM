import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  templateUrl: './admin-dashboard-layout.component.html',
  styleUrls: ['./admin-dashboard-layout.component.css']
})
export class AdminDashboardLayoutComponent implements OnInit {
  allFormsData: any;
  page = 1;
  itemPerPage = 10;

  constructor(private httpService: HttpService,
    private routes: Router) {
    this.getdata()
  

  }
  logout() {
    this.routes.navigate(['/adminLogin'])
  }
  ngOnInit(): void {
  }
  getdata() {
    this.httpService.getData(this.page, this.itemPerPage).subscribe((data: any) => {
      console.log(data);

      data.forms.map((item: any) => {
        if (item.category === 'cat1') {
          item.category = ' Technology /  Product Innovation to address Defence Capability Gaps'
        }
        else if (item.category === 'cat2') {
          item.category = 'Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
        }
        else if (item.category === 'cat3') {
          item.category = '  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
        }
        else {
          item.category = 'Export Performance of Defence & Aerospace Products'
        }
        if (item.typeOfApplicant === 'L') {
          item.typeOfApplicant = 'Annual Turnover FY 2020-21 over & above Rs 250 Crore'
        }
        else if (item.typeOfApplicant === 'M') {
          item.typeOfApplicant = 'Annual Turnover FY 2020-21 between Rs 75 to 250 Crore'
        }
        else {
          item.typeOfApplicant = 'Annual Turnover FY 2020-21 less than Rs 75 Crore'
        }
        item.panNumberOfOrganization = item.panNumberOfOrganization.toUpperCase();

      })
      this.allFormsData = data

      console.log(this.allFormsData);

    })

  }

  viewDetails(id: string) {
    let url: string = "/detail/" + id
    this.routes.navigateByUrl(url);

  }
  perviousPage() {
    this.page = this.page - 1;
    this.getdata()
  }
  nextpage() {
    this.page = this.page + 1;
    this.getdata()
  }

}
