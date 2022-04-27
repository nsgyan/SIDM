import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  templateUrl: './admin-dashboard-layout.component.html',
  styleUrls: ['./admin-dashboard-layout.component.css']
})
export class AdminDashboardLayoutComponent implements OnInit {
  requestInfo:FormGroup
  allFormsData: any;
  page = 1;
  index=0;
  itemPerPage = 10;
  id: any;

  constructor(private httpService: HttpService,
    private toast: ToastrService,
    private localStorage: LocalStorageService,
    private routes: Router,
    private fb: FormBuilder) {
    this.getdata('')
    this.requestInfo=this.fb.group({
      remark:['']
    })
  

  }
  logout() {
    this.localStorage.clearLocalStorage()
    this.routes.navigate(['login/admin'])

  }
  ngOnInit(): void {
  }
  getdata(type:string) {
    this.httpService.getData(this.page, this.itemPerPage).subscribe((data: any) => {
      data?.forms.map((item: any) => {
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
        item.panNumberOfOrganization = item.panNumberOfOrganization;

      })
      this.allFormsData = data

     if(type==='pervious'){
      this.index-=10
     }
     else if(type==='next'){
       this.index+=10
     }

    }, err => {
      this.toast.error(err.error);
      this.routes.navigate(['login/admin'])

    })

  }

  viewDetails(id: string) {
    let url: string = "/detail/" + id
    this.routes.navigateByUrl(url);

  }
  perviousPage() {
    this.page = this.page - 1;
    this.getdata('pervious')
  }
  nextpage() {
    this.page = this.page + 1;
    this.getdata('next')
  }
  approve(id:string){
    let createAt = new Date();
    this.httpService.changeStatus(id,{status:'approve',createAt:createAt}).subscribe(data=>{
      window.location.reload()    
      this.toast.success('successfully status change');
    },err=>{
      this.toast.error('Please try again');

    })
  }
  modalOpen(id:any){
    this.id=id;
  }
  remark(){
    let createAt = new Date();

    this.httpService.changeStatus(this.id,{status:'Request Info',message:this.requestInfo.value.remark,createAt:createAt}).subscribe(data=>{
      this.toast.success('successfully status change');
    },err=>{
      this.toast.error('Please try again');
    })
  }

}
