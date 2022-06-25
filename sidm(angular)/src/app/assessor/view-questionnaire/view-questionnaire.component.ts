import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
import { environment } from 'src/environments/environment.prod';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.css']
})
export class ViewQuestionnaireComponent implements OnInit {
  id:any 
  lastIndex!:number;
  assessor:FormGroup
  url=environment.download
  aissmentdata:any
  category:any;
  maxScore: any=0;
  assessorScore: any=0;
  submitted: boolean=false;
  userData:any;
  remark:any;
 totalMaxScore=0
 TotalObtained=0
 askedDoccument:any=null
  scorebyAssessor:any;
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private routes: Router,
    public dialog: MatDialog,
    private router: Router,
    private localStorage: LocalStorageService,
    private _location: Location
    ) { 
      
      let email= this.localStorage.get('email')
    this.id = this.route.snapshot.paramMap.get('id')
    this.httpService.getdetails(this.id).subscribe((data:any)=>{
      if (data?.category === 'cat1') {
    this.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
      }
      else if (data?.category === 'cat2') {
        this.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
      }
      else if (data?.category === 'cat3') {
        this.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
      }
      else if (data?.category === 'cat4') {
        this.category = 'C4- Export Performance of Defence & Aerospace Products'
      }

      if (data?.typeOfApplicant === 'L') {
        data.typeOfApplicant = 'L – Large (Annual Turnover FY 2020-21 over   & above Rs 250 Crore)'
      }
      else if (data?.typeOfApplicant === 'M') {
        data.typeOfApplicant = 'M – Medium  (Annual Turnover FY 2020-21 between  Rs 75 to 250 Crore)'
      }
      else if (data?.typeOfApplicant === 'S') {
        data.typeOfApplicant = 'S – Small  (Annual Turnover FY 2020-21 less than Rs 75 Crore)'
      }
      data.assessor.map((item:any)=>{
        let assessorID= this.localStorage.get('assessorID');
        if(assessorID===item.id&&item.document){
          
          this.askedDoccument=  environment.download + item.document
        }

      })
      
     this.userData=data
      
    })
    this.assessor=this.fb.group({
      aissment: this.fb.array([]) ,
      assessorScore:[''],
      adminReview:[''],
      assessorRemark:[''],
      doccumentAskedByAdmin:[]
   
    })
    this.httpService.getQuestionnaireAissment(this.id).subscribe((data:any)=>{
  
      if(data.doccumentAskedByAdmin){
        this.assessor.get('doccumentAskedByAdmin')?.setValue(data.doccumentAskedByAdmin)
        this.assessor.get('doccumentAskedByAdmin')?.updateValueAndValidity()
      }
      if(data.adminReview){
        this.assessor.get('adminReview')?.setValue(data.adminReview)
        this.assessor.get('adminReview')?.updateValueAndValidity()
      }
 
 
    
if(data.category==='cat4'){
  data.staticTable.map((item:any)=>{
    item.uploadDocuments = environment.download + item.uploadDocuments

  })
}
    let control = <FormArray>this.assessor.get('aissment');
  this.lastIndex=data.questionAns.length-1;
    
    data.questionAns.map((item:any)=>{
      item.assessor.map((assessor:any)=>{
        let assessorID= this.localStorage.get('assessorID')
        if(assessor.id===assessorID){
          this.remark=assessor.remark
          this.scorebyAssessor=assessor.score
          
        }
      
      })
      if(item.inputType==='assessorScore'){
        control.push(
          this.fb.group({
            question: [item.question],      
            answer:[item.answer],
            uploadDocuments:[item.uploadDocuments],
            description:[item.description],
            score:[item.score],     
            inputType:[item.inputType],
            assessor:[item.assessor],
            option:[item.option],
            maxScore:[item.maxScore,] ,
            applicantAnswer:[item.applicantAnswer?item.applicantAnswer:item.answer],
            adminRemark:[item.adminRemark?item.adminRemark:''],
            adminAnswer:[item.adminAnswer?item.adminAnswer:''],
            table:[item.table?item.table:''], 
            parameterDescription:[item.parameterDescription],
            assessorRemark:[this.remark?this.remark:null],
            assessorScore:[this.scorebyAssessor?this.scorebyAssessor:null,[Validators.max(Number( item.maxScore))]] 
          })
        );}
        else{
          control.push(
            this.fb.group({
              question: [item.question],      
            answer:[item.answer],
            uploadDocuments:[item.uploadDocuments],
            description:[item.description],
            score:[item.score],     
            inputType:[item.inputType],
            assessor:[item.assessor],
            option:[item.option],
            maxScore:[item.maxScore,] ,
            applicantAnswer:[item.applicantAnswer?item.applicantAnswer:item.answer],
            adminRemark:[item.adminRemark?item.adminRemark:''],
            adminAnswer:[item.adminAnswer?item.adminAnswer:''],
            table:[item.table?item.table:''], 
            parameterDescription:[item.parameterDescription],
            assessorRemark:[this.remark?this.remark:null],
            assessorScore:[this.scorebyAssessor?this.scorebyAssessor:null,[Validators.max(Number( item.maxScore))]]
            })
          );
        }
   
 })
      data.questionAns.map((item:any)=>{
        item.maxScore= Number( item.maxScore);
        this.maxScore=this.maxScore+item.maxScore
        item.assessorScore= Number( item.assessorScore);
        this.assessorScore=this.assessorScore+item.assessorScore
        item.table.map((tableData:any)=>{
          if(tableData.uploadDocuments){
            tableData.uploadDocuments = environment.download + tableData.uploadDocuments
          }
        })
        if(item.uploadDocuments){
          item.uploadDocuments = environment.download + item.uploadDocuments
        }
      })
      this.aissmentdata=data
      console.log(this.aissmentdata,'asda');
      if(data.assessorRemark){
        this.assessor.get('assessorRemark')?.setValue(data.assessorRemark)
        this.assessor.get('assessorRemark')?.updateValueAndValidity()}
        if(data.assessorScore){
        this.assessor.get('assessorScore')?.setValue(data.assessorScore)
        this.assessor.get('assessorScore')?.updateValueAndValidity()
        }
        console.log(this.assessor);
        
      
    },err=>{
      this.routes.navigate(['login/admin'])
    })
  }

  get nameAissment(): FormArray {
    return this.assessor.get('aissment') as FormArray;
  }


  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  ngOnInit(): void {
  }

  
    
  

  submit(status:any){
 
 
  let control = <FormArray>this.assessor.get('aissment');

  this.aissmentdata.questionAns.map((FormData:any)=>{

    this.TotalObtained=this.TotalObtained+Number( FormData.score);
   
    this.totalMaxScore= this.totalMaxScore+Number( FormData.maxScore);
  })
  console.log(this.TotalObtained);
  console.log(this.totalMaxScore);
  
  
  
 let x=0
    this.aissmentdata.questionAns.map((item:any)=>{
      let j=0;
      control.value.map((FormData:any)=>{
        if( item.question=== FormData.question){
item.assessor.map((assessor:any)=>{
  let assessorID= this.localStorage.get('assessorID')
  if(assessor.id===assessorID){
    assessor.remark=control.at(j).value.assessorRemark
    assessor.score=control.at(j).value.assessorScore
    assessor.maxScore=control.at(j).value.maxScore
  }
})
        }
        j++;
      }) 
      control.at(x).get("assessor")?.reset()
      control.at(x).get("assessor")?.updateValueAndValidity()
      control.at(x).get("assessor")?.setValue(item.assessor)
      control.at(x).get("assessor")?.updateValueAndValidity()
x++;
 
    })

    

    if(this.assessor.valid){
      let name= this.localStorage.get('name')
      let email= this.localStorage.get('email')
      let assessorID= this.localStorage.get('assessorID')
      let control = <FormArray>this.assessor.get('aissment');
      let assessorScore=0
      let assessorMaxScore=0
      let i=0;
      this.aissmentdata.questionAns.map((item:any)=>{
        if(item.inputType==='assessorScore')
        {
          let Maxscore=  Number( control.at(i).value.maxScore)
          assessorMaxScore+=Maxscore
      let score=  Number( control.at(i).value.assessorScore)
           assessorScore+=score
        }
        i++;
      })
      
      this.aissmentdata.assessor.map((item:any)=>{
        if(item.id===assessorID){
          item.status=status
          item.maxScore=assessorMaxScore,
          item.score=assessorScore,
          item.assessorRemark=this.assessor.value.assessorRemark
        }
      })
      this.httpService.updateQuestionnaireAissment({
        id:this.aissmentdata._id,
        assessorMaxScore:assessorMaxScore,
        assessor: this.aissmentdata.assessor,
        assessorScore:assessorScore,
        assessorID:assessorID,
        assessorEmail:email,
      //   adminReview:this.assessor.value.adminReview,
      // doccumentAskedByAdmin:this.assessor.value.doccumentAskedByAdmin,
        assessorName:name,
        status:status,
        aissment:this.assessor.value.aissment,
        assessorRemark:this.assessor.value.assessorRemark,
        TotalObtained: this.aissmentdata.totalScore,
      totalMaxScore:this.totalMaxScore

      }).subscribe(data=>{
        this.toast.success('Assessor Score Updated');
        this.routes.navigate(['/assessor'])
        
      },err=>{
        this.toast.error(err);
      })
    }
    else {
      this.submitted = true;
    
      this.toast.error('Please Fill Required Field');
    }
    
  }

  
  staticSubmit(status:any){

 
  let control = <FormArray>this.assessor.get('aissment');
  // this.aissmentdata.questionAns.map((FormData:any)=>{

  //   this.TotalObtained=this.TotalObtained+Number( FormData.score);
   
  //   this.totalMaxScore= this.totalMaxScore+Number( FormData.maxScore);
  // })
  // console.log(this.TotalObtained);
  // console.log(this.totalMaxScore);
  
    let x=0
       this.aissmentdata.questionAns.map((item:any)=>{
         let j=0;
         control.value.map((FormData:any)=>{
           if( item.question=== FormData.question){
   item.assessor.map((assessor:any)=>{
     let assessorID= this.localStorage.get('assessorID')
     if(assessor.id===assessorID){
       assessor.remark=control.at(j).value.assessorRemark
       assessor.score=control.at(j).value.assessorScore
       assessor.maxScore=control.at(j).value.maxScore
     }
   })
           }
           j++;
         })
         control.at(x).get("assessor")?.reset()
         control.at(x).get("assessor")?.updateValueAndValidity()
         control.at(x).get("assessor")?.setValue(item.assessor)
         control.at(x).get("assessor")?.updateValueAndValidity()
   x++;
    
       })
    if(this.assessor.valid){
      let name= this.localStorage.get('name')
      let email= this.localStorage.get('email')
      let assessorID= this.localStorage.get('assessorID')
      let control = <FormArray>this.assessor.get('aissment');
      let assessorScore=0
      let assessorMaxScore=10
      let score=  Number( this.assessor.value.assessorScore)
           assessorScore+=score
      let i=0;
      this.aissmentdata.questionAns.map((item:any)=>{
        if(item.description)
        {
          let Maxscore=  Number( control.at(i).value.maxScore)
          assessorMaxScore+=Maxscore
      let score=  Number( control.at(i).value.assessorScore)
           assessorScore+=score
        }
        i++;
      })
      this.aissmentdata.assessor.map((item:any)=>{
        if(item.id===assessorID){
          item.status=status
          item.maxScore=assessorMaxScore,
          item.score=assessorScore,
          item.assessorRemark=this.assessor.value.assessorRemark
        }
      })
      this.httpService.updateQuestionnaireAissment({
        id:this.aissmentdata._id,
        assessor: this.aissmentdata.assessor,
        assessorMaxScore:assessorMaxScore,
        assessorScore:assessorScore,
        assessorID:assessorID,
        assessorEmail:email,
        assessorName:name,
        status:status,
        aissment:this.assessor.value.aissment,
        assessorRemark:this.assessor.value.assessorRemark,
          TotalObtained: this.aissmentdata.totalScore,
        totalMaxScore:this.totalMaxScore

      }).subscribe(data=>{
        this.toast.success('Assessor Score Updated');
        this.routes.navigate(['/assessor'])
        
      },err=>{
        this.toast.error(err);
      })
    }
    else {
      this.submitted = true;
    
      this.toast.error('Please Fill Required Field');
    }
    
  }


  navigateTo(category:any,type:any,status:any){
    this.router.navigate(['/assessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
    // this.router.navigate( ['/assessor/applicantList'], { queryParams: { jwt: '1236XWK+4bpLA++2UfBr'}});
    // this.router.navigate( ['assessor/applicantList'], { queryParams: { category: category,type:type,status:status}});
  }
  goBack(){
    this._location.back();
  }

  openModel(_static:any){
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '500px',
      data: {type:'assessorAssessorRequestInfo',adminRemark:this.aissmentdata.assessorRemark?this.aissmentdata.assessorRemark:null,},
    });
    
    dialogRef.afterClosed().subscribe((res:any) => {
      // received data from dialog-component
    
      if(res===null){
        console.log(res,'close');
      }
      else{
        console.log(res,'open');
      
      
  if(res?.remark){
      this.assessor.get('assessorRemark')?.setValue(res.remark)
      this.assessor.get('assessorRemark')?.updateValueAndValidity()
      if(_static==='cat4'){
        this.staticSubmit('Call Review')
      }
      else{
        this.submit('Call Review')
     
        
      }
      }
    }
   
    })
  }

  viewDetails(id: string) {
    let url: string = "/assessor/applicantForm/" + id
    // this.routes.([]).then(result => {  window.open(link, '_blank'); });
    this.routes.navigate([]).then(result => {  window.open(url, '_blank'); });
  
  }

}

