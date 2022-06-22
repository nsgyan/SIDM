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
              this.cat1.mediumType.total+=1
              if(item.questionnaireStatus==='Submitted'){
                this.cat1.mediumType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat1.mediumType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat1.mediumType.requestInfo+=1
              }
  
       
            }else if(item.typeOfApplicant==='L')
            {  
              this.cat1.LargeType.total+=1
                if(item.questionnaireStatus==='Submitted'){
              this.cat1.LargeType.pending+=1
            }
            else if(item.questionnaireStatus==='approved'){
              this.cat1.LargeType.approved+=1
            }
            else if(item.questionnaireStatus==='requestInfo'){
              this.cat1.LargeType.requestInfo+=1
            }
       
            }
            else if(item.typeOfApplicant==='S')
            {
              this.cat1.startUpType.total+=1
              if(item.questionnaireStatus==='Submitted'){
                this.cat1.startUpType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat1.startUpType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat1.startUpType.requestInfo+=1
              }
              
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
              
            }
         }
            else  if(item.category==='cat3'){
              if(item.typeOfApplicant==='M'){
                this.cat3.mediumType.total+=1
                if(item.questionnaireStatus==='Submitted'){
                  this.cat3.mediumType.pending+=1
                }
                else if(item.questionnaireStatus==='approved'){
                  this.cat3.mediumType.approved+=1
                }
                else if(item.questionnaireStatus==='requestInfo'){
                  this.cat3.mediumType.requestInfo+=1
                }
    
         
              }else if(item.typeOfApplicant==='L')
              {  
                this.cat3.LargeType.total+=1
                  if(item.questionnaireStatus==='Submitted'){
                this.cat3.LargeType.pending+=1
              }
              else if(item.questionnaireStatus==='approved'){
                this.cat3.LargeType.approved+=1
              }
              else if(item.questionnaireStatus==='requestInfo'){
                this.cat3.LargeType.requestInfo+=1
              }
         
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
         
              }
              else if(item.typeOfApplicant==='S')
              {
                this.cat4.startUpType.total+=1 
                if(item.questionnaireStatus==='Submitted'){
                  this.cat4.startUpType.pending+=1
                }
                else if(item.questionnaireStatus==='approved'){
                  this.cat4.startUpType.approved+=1
                }
                else if(item.questionnaireStatus==='requestInfo'){
                  this.cat4.startUpType.requestInfo+=1
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
  