import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-dashboard-layout',
  templateUrl: './admin-dashboard-layout.component.html',
  styleUrls: ['./admin-dashboard-layout.component.css']
})
export class AdminDashboardLayoutComponent implements OnInit {
  requestInfo:FormGroup
  displayedColumns: string[] = ['createAt','name', 'email', 'mobileNumber', 'panNumber','category','typeOfApplicant','nameOfCompany','sidmMember','paymentStatus','offlinePaymentDetails','status','actions'];
  dataSource !: MatTableDataSource<any> ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
        const format = ' dd MMM, y, HH:mm,';
        const locale = 'en-US';
        item.createAt = formatDate(item.createAt, format, locale)
        // console.log(data.createAt.type);

        // data.createAt = formatDate(data.createAt, 'yyyy-MM-dd', 'en-US')
        item.panNumberOfOrganization = item.panNumberOfOrganization;

      })
      this.dataSource = new MatTableDataSource(data.forms);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


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
    this.httpService.changeStatus(id,{status:'Approved',createAt:createAt}).subscribe(data=>{
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
      window.location.reload()   
    },err=>{
      this.toast.error('Please try again');
    })
  }

  editForm(id:any){
 
    // this.routes.navigate(['/adminEdit/edit/',id]);
    let url: string = "/adminDashboard/edit/" +id
    this.routes.navigateByUrl(url);
    // this.routes.navigateByUrl(url);
    // window.location.href=url
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
