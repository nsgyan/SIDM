import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  requestInfo:FormGroup
  displayedColumns: string[] = [ 'index','createAt','nameOfCompany', 'email','name','category','sidmMember','paymentStatus','offlinePaymentDetails','status','questionnaireStatus'];
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
    private fb: FormBuilder,
    public dialog: MatDialog) {
      let type= this.localStorage.get('type');
      if(type!=="admin"){
this.localStorage.clearLocalStorage()
this.routes.navigate(['/login/admin'])

      }
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
      data?.data.map((item: any) => {
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
        // console.log(data.createAt.type);

        // data.createAt = formatDate(data.createAt, 'yyyy-MM-dd', 'en-US')
        item.panNumberOfOrganization = item.panNumberOfOrganization;

      })
      this.dataSource = new MatTableDataSource(data.data);

      this.dataSource.sort = this.sort;


    }, err => {
      this.toast.error(err.error);
      this.routes.navigate(['login/admin'])

    })

  }

  viewDetails(id: string) {
    let url: string = "/dashboard/admin/applicantForm/" + id
    // this.routes.([]).then(result => {  window.open(link, '_blank'); });
    this.routes.navigate([]).then(result => {  window.open(url, '_blank'); });

  }


  approve() {
    let createAt = new Date();
    this.httpService.changeStatus(this.id, { status: 'Approved', createAt: createAt }).subscribe(data => {
      window.location.reload()    
      this.toast.success('successfully status change');
    },err=>{
      this.toast.error('Please try again');

    })
  }

  modalOpen(id:any,type:any){
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '500px',
      data: {id: id,type:type},
    });


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
    let url: string = "/dashboard/admin/edit/" +id
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
  viewQuestionnaire(id:any){
    let url: string = "/dashboard/admin/ViewApplicantQuestionnaire/" +id
    this.routes.navigateByUrl(url);

  }

}
