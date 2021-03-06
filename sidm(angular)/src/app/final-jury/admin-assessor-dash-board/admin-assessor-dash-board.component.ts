import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-admin-assessor-dash-board',
  templateUrl: './admin-assessor-dash-board.component.html',
  styleUrls: ['./admin-assessor-dash-board.component.css']
})
export class AdminAssessorDashBoardComponent implements OnInit {

  cat1={
    LargeType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    mediumType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    startUpType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    }
  }
  cat2={
    LargeType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    mediumType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    startUpType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    }
  }
  cat3={
    LargeType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    mediumType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    startUpType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    }
  }
  cat4={
    LargeType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    mediumType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    },
    startUpType:{
      total:0,
      pending:0,
      callReview:0,
      completed:0
    }
  }
    constructor(private httpService:HttpService,
      private localStorage: LocalStorageService,
      private router: Router) { 
        let email= this.localStorage.get('email');
        if(email!=="finaljury@sidm.com"){
  this.localStorage.clearLocalStorage()
  const url='/login/finalJury'
window.location.href=url
        }

      this.getMemberData('cat1','M')
      this.getMemberData('cat1','L')
      this.getMemberData('cat1','S')
      this.getMemberData('cat2','M')
      this.getMemberData('cat2','L')
      this.getMemberData('cat2','S')
      this.getMemberData('cat3','M')
      this.getMemberData('cat3','L')
      this.getMemberData('cat3','S')
     this.getMemberData('cat4','M')
     this.getMemberData('cat4','L')
     this.getMemberData('cat4','S')
    }
  
    ngOnInit(): void {
    }
  
    navigateTo(category:any,type:any,status:any){
      this.router.navigate(['/finalJury/applicantList'], { queryParams: { category: category,type:type,status:status}});
      // this.router.navigate( ['/assessor/applicantList'], { queryParams: { jwt: '1236XWK+4bpLA++2UfBr'}});
      // this.router.navigate( ['assessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
    }
  
    getMemberData(category:any,typeOfApplicant:any){
     let name= this.localStorage.get('name')
     let email= this.localStorage.get('email')
      this.httpService.assessorDashboard(category,typeOfApplicant).subscribe((data:any)=>{
        data.map((item:any)=>{
          item.assessor.map((assessor:any)=>{
            if(assessor.email===email){
            item.assessorStatus=assessor.status
  
            }
          })
          console.log(item);
          
          if(category==='cat1'){
            if(typeOfApplicant==='M'){
              this.cat1.mediumType.total+=1
              if(item.assessorStatus==='Pending'){
                this.cat1.mediumType.pending+=1
              }
              else if(item.assessorStatus==='Completed'){
                this.cat1.mediumType.completed+=1
              }
              else if(item.assessorStatus==='Call Review'){
                this.cat1.mediumType.callReview+=1
              }
  
       
            }else if(typeOfApplicant==='L')
            {  
              this.cat1.LargeType.total+=1
                if(item.assessorStatus==='Pending'){
              this.cat1.LargeType.pending+=1
            }
            else if(item.assessorStatus==='Completed'){
              this.cat1.LargeType.completed+=1
            }
            else if(item.assessorStatus==='Call Review'){
              this.cat1.LargeType.callReview+=1
            }
       
            }
            else if(typeOfApplicant==='S')
            {
              this.cat1.startUpType.total+=1
              if(item.assessorStatus==='Pending'){
                this.cat1.startUpType.pending+=1
              }
              else if(item.assessorStatus==='Completed'){
                this.cat1.startUpType.completed+=1
              }
              else if(item.assessorStatus==='Call Review'){
                this.cat1.startUpType.callReview+=1
              }
              
            }
          }
          else  if(category==='cat2'){
            if(typeOfApplicant==='M'){
              this.cat2.mediumType.total+=1
              if(item.assessorStatus==='Pending'){
                this.cat2.mediumType.pending+=1
              }
              else if(item.assessorStatus==='Completed'){
                this.cat2.mediumType.completed+=1
              }
              else if(item.assessorStatus==='Call Review'){
                this.cat2.mediumType.callReview+=1
              }
  
       
            }else if(typeOfApplicant==='L')
            {  
              this.cat2.LargeType.total+=1
                if(item.assessorStatus==='Pending'){
              this.cat2.LargeType.pending+=1
            }
            else if(item.assessorStatus==='Completed'){
              this.cat2.LargeType.completed+=1
            }
            else if(item.assessorStatus==='Call Review'){
              this.cat2.LargeType.callReview+=1
            }
       
            }
            else if(typeOfApplicant==='S')
            {
              this.cat2.startUpType.total+=1
              if(item.assessorStatus==='Pending'){
                this.cat2.startUpType.pending+=1
              }
              else if(item.assessorStatus==='Completed'){
                this.cat2.startUpType.completed+=1
              }
              else if(item.assessorStatus==='Call Review'){
                this.cat2.startUpType.callReview+=1
              }
              
            }
         }
            else  if(category==='cat3'){
              if(typeOfApplicant==='M'){
                this.cat3.mediumType.total+=1
                if(item.assessorStatus==='Pending'){
                  this.cat3.mediumType.pending+=1
                }
                else if(item.assessorStatus==='Completed'){
                  this.cat3.mediumType.completed+=1
                }
                else if(item.assessorStatus==='Call Review'){
                  this.cat3.mediumType.callReview+=1
                }
    
         
              }else if(typeOfApplicant==='L')
              {  
                this.cat3.LargeType.total+=1
                  if(item.assessorStatus==='Pending'){
                this.cat3.LargeType.pending+=1
              }
              else if(item.assessorStatus==='Completed'){
                this.cat3.LargeType.completed+=1
              }
              else if(item.assessorStatus==='Call Review'){
                this.cat3.LargeType.callReview+=1
              }
         
              }
              else if(typeOfApplicant==='S')
              {
                this.cat3.startUpType.total+=1
                if(item.assessorStatus==='Pending'){
                  this.cat3.startUpType.pending+=1
                }
                else if(item.assessorStatus==='Completed'){
                  this.cat3.startUpType.completed+=1
                }
                else if(item.assessorStatus==='Call Review'){
                  this.cat3.startUpType.callReview+=1
                }
                
              }
           }
             else  if(category==='cat4'){
              if(typeOfApplicant==='M'){
                this.cat4.mediumType.total+=1
                if(item.assessorStatus==='Pending'){
                  this.cat4.mediumType.pending+=1
                }
                else if(item.assessorStatus==='Completed'){
                  this.cat4.mediumType.completed+=1
                }
                else if(item.assessorStatus==='Call Review'){
                  this.cat4.mediumType.callReview+=1
                }
    
         
              }else if(typeOfApplicant==='L')
              {  this.cat4.LargeType.total+=1 
                  if(item.assessorStatus==='Pending'){
                this.cat4.LargeType.pending+=1
              }
              else if(item.assessorStatus==='Completed'){
                this.cat4.LargeType.completed+=1
              }
              else if(item.assessorStatus==='Call Review'){
                this.cat4.LargeType.callReview+=1
              }
         
              }
              else if(typeOfApplicant==='S')
              {
                this.cat4.startUpType.total+=1 
                if(item.assessorStatus==='Pending'){
                  this.cat4.startUpType.pending+=1
                }
                else if(item.assessorStatus==='Completed'){
                  this.cat4.startUpType.completed+=1
                }
                else if(item.assessorStatus==='Call Review'){
                  this.cat4.startUpType.callReview+=1
                }
                
              }
             }
           
          
        })
        
      })
  
    }


    navigate(url:any){
      this.router.navigateByUrl(url);
    }
  
  }
  