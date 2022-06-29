import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';

@Component({
  selector: 'app-assessor-questionnaire',
  templateUrl: './assessor-questionnaire.component.html',
  styleUrls: ['./assessor-questionnaire.component.css']
})
export class AssessorQuestionnaireComponent implements OnInit {
  allFormsData: any;
  page:any='sd';
  index=0;
  
  filter:FormGroup;
  itemPerPage = 10;
  applicantData:any;
average=0
  id: any;
  submited: boolean=false;
  constructor(private httpService: HttpService,
    private toast: ToastrService,
   
    private routes: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private localStorage: LocalStorageService,) { 
    
      this.getdata('sdaf')
      this.filter= this.fb.group({
        category:['',Validators.required],
        typeOfapplicant:['',Validators.required]
      })
    }

  ngOnInit(): void {
  }

  getdata(type:string) {
    this.httpService.assessmentsList().subscribe((data: any) => {
 data.map((item: any) => {
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
        let i = 0
        this.average=0
        item.assessor.map((assessor:any)=>{
          if (assessor.status !== "Pending") {
          this.average+=Number( assessor.applicantScore);
            this.average += assessor.score
            i++
          }
        })
   item.average = Math.round((this.average*100)) / (i * 100)
        const format = 'dd-MMM-yy';
        const locale = 'en-US';
        item.createAt = formatDate(item.createAt, format, locale)
        // console.log(data.createAt.type);

        // data.createAt = formatDate(data.createAt, 'yyyy-MM-dd', 'en-US')
        item.panNumberOfOrganization = item.panNumberOfOrganization;

      })
      data.map((item:any)=>{
        item.assessor.map((assessorUser:any)=>{
          if(assessorUser.email==='prahlada.ramarao@gmail.com'){
            item.prahlada=assessorUser
            console.log('jhkeeo');
            
          }
          if(assessorUser.email==='aspillai.bm@gmail.com'){
            item.aspillai=assessorUser
          }
          else  if(assessorUser.email==='jp.nehra@cii.in'){
            item.jp=assessorUser
          }
          else  if(assessorUser.email==='scbajpai1@gmail.com'){
            item.scbajpai1=assessorUser
          }
          else  if(assessorUser.email==='rktyagi.hal@gmail.com'){
            item.rktyagi=assessorUser
          }
          else  if(assessorUser.email==='pritam.lal@cii.in'){
            item.pritam=assessorUser
          }
          else  if(assessorUser.email==='dg@sidm.in'){
            item.dg=assessorUser
          }
          else  if(assessorUser.email==='bharat.jain@sidm.in'){
            item.bharat=assessorUser
          }
        })
      })
      console.log(data);
      
      this.applicantData=data
     

    }, err => {
      this.toast.error(err.error);
      this.routes.navigate(['login/admin'])

    })

  }
  filterData(){
    if(this.filter.valid){
this.httpService.filterAssessmentsList(this.filter.value.category,this.filter.value.typeOfapplicant).subscribe((data:any)=>{
  data.map((item: any) => {
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
  data.map((item:any)=>{
    item.assessor.map((assessorUser:any)=>{
      if(assessorUser.email==='prahlada.ramarao@gmail.com'){
        item.prahlada=assessorUser
        console.log('jhkeeo');
        
      }
      if(assessorUser.email==='aspillai.bm@gmail.com'){
        item.aspillai=assessorUser
      }
      else  if(assessorUser.email==='jp.nehra@cii.in'){
        item.jp=assessorUser
      }
      else  if(assessorUser.email==='scbajpai1@gmail.com'){
        item.scbajpai1=assessorUser
      }
      else  if(assessorUser.email==='rktyagi.hal@gmail.com'){
        item.rktyagi=assessorUser
      }
      else  if(assessorUser.email==='pritam.lal@cii.in'){
        item.pritam=assessorUser
      }
      else  if(assessorUser.email==='dg@sidm.in'){
        item.dg=assessorUser
      }
      else  if(assessorUser.email==='bharat.jain@sidm.in'){
        item.bharat=assessorUser
      }
    })
  })
  console.log(data);
  
  this.applicantData=data
})
    }
    else{
      this.submited = true;
      this.toast.error('Please Fill Required Field');
    }

  }
  reset(){
   
  }
  navigateTo(category:any,type:any,status:any){
        this.routes.navigate(['/adminAssessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
        // this.router.navigate( ['/assessor/applicantList'], { queryParams: { jwt: '1236XWK+4bpLA++2UfBr'}});
        // this.router.navigate( ['assessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
      }
   
      openModel(data:any){
        const dialogRef = this.dialog.open(ModelComponent, {
          width: '500px',
          data: {data: data,type:'View'},
        });
        
      
      }
 
}


//   constructor( private router: Router) { }

//   ngOnInit(): void {
//   }
   
//   navigateTo(category:any,type:any,status:any){
//     this.router.navigate(['/adminAssessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
//     // this.router.navigate( ['/assessor/applicantList'], { queryParams: { jwt: '1236XWK+4bpLA++2UfBr'}});
//     // this.router.navigate( ['assessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
//   }

// }
