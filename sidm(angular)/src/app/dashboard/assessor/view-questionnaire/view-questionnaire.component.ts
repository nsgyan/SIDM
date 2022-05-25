import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ControlContainer } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
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
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private routes: Router,
    public dialog: MatDialog
    ) { 
      
    this.id = this.route.snapshot.paramMap.get('id')
    this.assessor=this.fb.group({
      aissment: this.fb.array([]) 
    })
    this.httpService.getQuestionnaireAissment(this.id).subscribe((data:any)=>{

    let control = <FormArray>this.assessor.get('aissment');
    data[0].questionAns.map((item:any)=>{
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
      assessorScore:['',[Validators.required,Validators.max(Number( item.maxScore))]] 
    })
  );
   
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
    console.log(this.assessor);
    if(this.assessor.valid){
      this.httpService.updateQuestionnaireAissment({
        id:this.aissmentdata._id,
        questionAns:this.assessor.value.aissment,
        assessorStatus:'submited'
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

}
