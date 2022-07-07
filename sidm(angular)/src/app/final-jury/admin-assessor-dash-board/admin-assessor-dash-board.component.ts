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
      requestInfo:0,
      approved:0
    },
    mediumType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    },
    startUpType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    }
  }
  cat2={
    LargeType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    },
    mediumType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    },
    startUpType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    }
  }
  cat3={
    LargeType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    },
    mediumType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    },
    startUpType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    }
  }
  cat4={
    LargeType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    },
    mediumType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    },
    startUpType:{
      total:0,
      pending:0,
      requestInfo:0,
      approved:0
    }
  }
    constructor(private httpService:HttpService,
      private localStorage: LocalStorageService,
      private router: Router) { 


          let email= this.localStorage.get('email');
          if(email!=="finaljury@sidm.com"){
    this.localStorage.clearLocalStorage()
    const url='/login/adminAssessor'
window.location.href=url
          }
      this.getMemberData('cat1','M')
    
    }
  
    ngOnInit(): void {
    }
  
    navigateTo(category:any,type:any,status:any){
      this.router.navigate(['/adminAssessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
      // this.router.navigate( ['/assessor/applicantList'], { queryParams: { jwt: '1236XWK+4bpLA++2UfBr'}});
      // this.router.navigate( ['assessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
    }
  
    getMemberData(category:any,typeOfApplicant:any){
     let name= this.localStorage.get('name')
     let email= this.localStorage.get('email')
      this.httpService.applicantQuestionnaire().subscribe((data:any)=>{
        data.map((item:any)=>{
       
     
          if(item.category==='cat1'){
            if(item.typeOfApplicant==='M'){

              if(item.questionnaireStatus==='Submitted'){
                this.cat1.mediumType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat1.mediumType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat1.mediumType.requestInfo+=1
              }
              this.cat1.mediumType.total = this.cat1.mediumType.pending + this.cat1.mediumType.approved + this.cat1.mediumType.requestInfo
  
       
            }else if(item.typeOfApplicant==='L')
            {  

                if(item.questionnaireStatus==='Submitted'){
              this.cat1.LargeType.pending+=1
            }
            else if(item.questionnaireStatus==='approved'){
              this.cat1.LargeType.approved+=1
            }
            else if(item.questionnaireStatus==='requestInfo'){
              this.cat1.LargeType.requestInfo+=1
            }
       
              this.cat1.LargeType.total = this.cat1.LargeType.approved + this.cat1.LargeType.pending + this.cat1.LargeType.requestInfo
            }
            else if(item.typeOfApplicant==='S')
            {

              if(item.questionnaireStatus==='Submitted'){
                this.cat1.startUpType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat1.startUpType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat1.startUpType.requestInfo+=1
              }
              this.cat1.startUpType.total = this.cat1.startUpType.approved + this.cat1.startUpType.pending + this.cat1.startUpType.requestInfo
              
            }
          }
          else  if(item.category==='cat2'){
            if(item.typeOfApplicant==='M'){
              this.cat2.mediumType.total+=1
              if(item.questionnaireStatus==='Submitted'){
                this.cat2.mediumType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat2.mediumType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat2.mediumType.requestInfo+=1
              }
              this.cat2.mediumType.total = this.cat2.mediumType.approved + this.cat2.mediumType.pending + this.cat2.mediumType.requestInfo
       
            }else if(item.typeOfApplicant==='L')
            {  
              this.cat2.LargeType.total+=1
                if(item.questionnaireStatus==='Submitted'){
              this.cat2.LargeType.pending+=1
            }
            else if(item.questionnaireStatus==='approved'){
              this.cat2.LargeType.approved+=1
            }
            else if(item.questionnaireStatus==='requestInfo'){
              this.cat2.LargeType.requestInfo+=1
            }
              this.cat2.LargeType.total = this.cat2.LargeType.approved + this.cat2.LargeType.pending + this.cat2.LargeType.requestInfo
       
            }
            else if(item.typeOfApplicant==='S')
            {
              this.cat2.startUpType.total+=1
              if(item.questionnaireStatus==='Submitted'){
                this.cat2.startUpType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat2.startUpType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat2.startUpType.requestInfo+=1
              }
              this.cat2.startUpType.total = this.cat2.startUpType.approved + this.cat2.startUpType.pending + this.cat2.startUpType.requestInfo
              
            }
         }
            else  if(item.category==='cat3'){
              if(item.typeOfApplicant==='M'){

                if(item.questionnaireStatus==='Submitted'){
                  this.cat3.mediumType.pending+=1
                }
                else if(item.questionnaireStatus==='approved'){
                  this.cat3.mediumType.approved+=1
                }
                else if(item.questionnaireStatus==='requestInfo'){
                  this.cat3.mediumType.requestInfo+=1
                }
                this.cat3.mediumType.total = this.cat3.mediumType.approved + this.cat3.mediumType.pending + this.cat3.mediumType.requestInfo
    
         
              }else if(item.typeOfApplicant==='L')
              {  

                  if(item.questionnaireStatus==='Submitted'){
                this.cat3.LargeType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat3.LargeType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat3.LargeType.requestInfo+=1
              }
                this.cat3.LargeType.total = this.cat3.LargeType.approved + this.cat3.LargeType.pending + this.cat3.LargeType.requestInfo
              }
              else if(item.typeOfApplicant==='S')
              {
                this.cat3.startUpType.total+=1
                if(item.questionnaireStatus==='Submitted'){
                  this.cat3.startUpType.pending+=1
                }
                else if(item.questionnaireStatus==='approved'){
                  this.cat3.startUpType.approved+=1
                }
                else if(item.questionnaireStatus==='requestInfo'){
                  this.cat3.startUpType.requestInfo+=1
                }
                this.cat3.startUpType.total = this.cat3.startUpType.approved + this.cat3.startUpType.pending + this.cat3.startUpType.requestInfo
              }
           }
             else  if(item.category==='cat4'){
              if(item.typeOfApplicant==='M'){
                this.cat4.mediumType.total+=1
                if(item.questionnaireStatus==='Submitted'){
                  this.cat4.mediumType.pending+=1
                }
                else if(item.questionnaireStatus==='approved'){
                  this.cat4.mediumType.approved+=1
                }
                else if(item.questionnaireStatus==='requestInfo'){
                  this.cat4.mediumType.requestInfo+=1
                }
    
                this.cat4.mediumType.total = this.cat4.mediumType.approved + this.cat4.mediumType.pending + this.cat4.mediumType.requestInfo
              }else if(item.typeOfApplicant==='L')
              {  this.cat4.LargeType.total+=1 
                  if(item.questionnaireStatus==='Submitted'){
                this.cat4.LargeType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat4.LargeType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat4.LargeType.requestInfo+=1
              }
                this.cat4.LargeType.total = this.cat4.LargeType.approved + this.cat4.LargeType.pending + this.cat4.LargeType.requestInfo
         
              }
              else if(item.typeOfApplicant==='S')
              {

                if(item.questionnaireStatus==='Submitted'){
                  this.cat4.startUpType.pending+=1
                }
                else if(item.questionnaireStatus==='approved'){
                  this.cat4.startUpType.approved+=1
                }
                else if(item.questionnaireStatus==='requestInfo'){
                  this.cat4.startUpType.requestInfo+=1
                }
                this.cat4.startUpType.total = this.cat4.startUpType.approved + this.cat4.startUpType.pending + this.cat4.startUpType.requestInfo
                
              }
             }
          
        })
        
      })
  
    }

    navigate(url:any){
      this.router.navigateByUrl(url);
    }
  
  }
  