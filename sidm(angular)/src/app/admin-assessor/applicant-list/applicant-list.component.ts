import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {
  requestInfo:FormGroup
  displayedColumns: string[] = [ 'index', 'actions','name','category','typeOfApplicant', 'nameOfCompany','questionnaireStatus',];
  dataSource !: MatTableDataSource<any> ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  allFormsData: any;
  page = 1;
  index=0;
  itemPerPage = 10;
  id: any;
  jwt: any;

  constructor(private httpService: HttpService,
    private toast: ToastrService,
    private localStorage: LocalStorageService,
    private routes: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _location: Location) {

        let email= this.localStorage.get('email');
        if(email!=="pritam.lal@cii.in"){
  this.localStorage.clearLocalStorage()
  const url='/login/adminAssessor'
window.location.href=url
        }

      this.route.queryParams.subscribe((params:any) => {
  console.log(params.category);
  this.getdata(params.category,params.type,params.status)
  
      });
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
  getdata(category:string,typeOfApplicant:any,status:any) {
    

    this.httpService.applicantQuestionnaireApplicantList(category,typeOfApplicant,status).subscribe((data:any)=>{
      console.log(data);
    
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      
    }, err => {
      console.log(err);
      

    })

  }

  viewDetails(id: string) {
    let url: string = "/detail/" + id
    this.routes.navigateByUrl(url);

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
  goBack(){
    this._location.back();
  }
  viewQuestionnaire(id:any){
    let url: string = "/adminAssessor/applicantQuestionnaire/" +id
    this.routes.navigateByUrl(url);

  }

  navigate(url:any){
    this.routes.navigateByUrl(url);
  }


}
