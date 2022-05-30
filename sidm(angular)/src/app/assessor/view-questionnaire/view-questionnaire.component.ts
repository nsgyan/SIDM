import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.css']
})
export class ViewQuestionnaireComponent implements OnInit {
  id:any
  assessor:FormGroup
  aissmentdata:any
  maxScore: any=0;
  assessorScore: any=0;
  submitted: boolean=false;
  userData:any;
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private routes: Router,
    public dialog: MatDialog,
    private router: Router,
    private localStorage: LocalStorageService,
    ) { 
      
     
    this.id = this.route.snapshot.paramMap.get('id')
    this.httpService.getdetails(this.id).subscribe((data:any)=>{
      if (data?.category === 'cat1') {
        data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
      }
      else if (data?.category === 'cat2') {
        data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
      }
      else if (data?.category === 'cat3') {
        data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
      }
      else if (data?.category === 'cat4') {
        data.category = 'C4- Export Performance of Defence & Aerospace Products'
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
     this.userData=data
      
    })
    this.assessor=this.fb.group({
      aissment: this.fb.array([]) 
    })
    this.httpService.getQuestionnaireAissment(this.id).subscribe((data:any)=>{

    let control = <FormArray>this.assessor.get('aissment');
    data[0].questionAns.map((item:any)=>{
      if(item.description){
  control.push(
    this.fb.group({
      question: [item.question],      
      answer:[item.answer],
      uploadDocuments:[item.uploadDocuments],
      description:[item.description],
      score:[item.score] ,
      inputType:[item.inputType],
      option:[item.option],
      maxScore:[item.maxScore],
      assessorScore:['',[Validators.max(Number( item.maxScore))]] 
    })
  );}
  else{
    control.push(
      this.fb.group({
        question: [item.question],      
        answer:[item.answer],
        uploadDocuments:[item.uploadDocuments],
        description:[item.description],
        score:[item.score] ,
        inputType:[item.inputType],
        option:[item.option],
        maxScore:[item.maxScore],
      })
    );
  }
   
 })
      data[0].questionAns.map((item:any)=>{
        item.maxScore= Number( item.maxScore);
        this.maxScore=this.maxScore+item.maxScore
        item.assessorScore= Number( item.assessorScore);
        this.assessorScore=this.assessorScore+item.assessorScore
        
        if(item.uploadDocuments){
          item.uploadDocuments = environment.download + item.uploadDocuments
        }
      })
      this.aissmentdata=data[0]
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

  openModel(data:any){
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '500px',
      data: {data: data,type:'ViewQuestionnaire'},
    });
    
  }

  submit(){
    if(this.assessor.valid){
      let name= this.localStorage.get('name')
      let email= this.localStorage.get('email')
      let assessorID= this.localStorage.get('assessorID')
      let control = <FormArray>this.assessor.get('aissment');
      let assessorScore=0
      let assessorMaxScore=0
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
      this.httpService.updateQuestionnaireAissment({
        id:this.aissmentdata._id,
        assessorMaxScore:assessorMaxScore,
        assessorScore:assessorScore,
        assessorID:assessorID,
        assessorEmail:email,
        assessorName:name

      }).subscribe(data=>{
        this.toast.success('Assessor Score Updated');
        this.routes.navigate(['/dashboard/assessor'])
        
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


}

