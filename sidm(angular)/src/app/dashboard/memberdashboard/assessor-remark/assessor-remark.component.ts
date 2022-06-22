import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import {Location} from '@angular/common';
import { ModelComponent } from 'src/app/shared/services/model/model.component';

@Component({
  selector: 'app-assessor-remark',
  templateUrl: './assessor-remark.component.html',
  styleUrls: ['./assessor-remark.component.css']
})
export class AssessorRemarkComponent implements OnInit {
  allFormsData: any;
  page:any='sd';
  index=0;
  
  itemPerPage = 10;
  applicantData:any;
average=0
  id: any;
  submited: boolean=false;
  constructor(private httpService: HttpService,
    private toast: ToastrService,
    private location: Location, 
    private routes: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,) { 
      this.id = this.route.snapshot.paramMap.get('id')
    
      this.httpService.getdetails(this.id).
      subscribe((data: any) => {
      
        data.assessor.map((assessorUser:any)=>{
          if(assessorUser.email==='prahlada.ramarao@gmail.com'){
            data.prahlada=assessorUser
          
            
          }
          if(assessorUser.email==='aspillai.bm@gmail.com'){
            data.aspillai=assessorUser
          }
          else  if(assessorUser.email==='jp.nehra@cii.in'){
            data.jp=assessorUser
          }
          else  if(assessorUser.email==='scbajpai1@gmail.com'){
            data.scbajpai1=assessorUser
          }
          else  if(assessorUser.email==='rktyagi.hal@gmail.com'){
            data.rktyagi=assessorUser
          }
          else  if(assessorUser.email==='pritam.lal@cii.in'){
            data.pritam=assessorUser
          }
          else  if(assessorUser.email==='dg@sidm.in'){
            data.dg=assessorUser
          }
          else  if(assessorUser.email==='bharat.jain@sidm.in'){
            data.bharat=assessorUser
          }
        })
      
        this.applicantData=data
       
       
      }, err => {
        this.toast.error(err.error);
        
        window.location.reload()
        this.routes.navigate(['login/member'])

      })

    }

  ngOnInit(): void {
  }


  reset(){
    location.reload();
  }
  navigateTo(category:any,type:any,status:any){
        this.routes.navigate(['/adminAssessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
        // this.router.navigate( ['/assessor/applicantList'], { queryParams: { jwt: '1236XWK+4bpLA++2UfBr'}});
        // this.router.navigate( ['assessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
      }
      goBack(){
        this.location?.back();
      }
      openModel(data:any){
        const dialogRef = this.dialog.open(ModelComponent, {
          width: '500px',
          data: {data: data,type:'View'},
        });
        
      
      }
      uploadDocument(data:any,assessor:any){
        const dialogRef = this.dialog.open(ModelComponent, {
          width: '500px',
          data: {data: data,type:'uploadDocument'},
        });
        dialogRef.afterClosed().subscribe((res:any) => {
          // received data from dialog-component
        
          if(res===null){
            console.log(res,'close');
          }
          else{
            console.log(res,'open');
          
          
      if(res?.document){
        assessor.document=res?.document
        this.httpService.assessorRequiredDocument({id:this.id,assessor:assessor}).subscribe(Data=>{
          console.log(Data);
          
        })
      
          }
        }
       
        })
        
      
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
