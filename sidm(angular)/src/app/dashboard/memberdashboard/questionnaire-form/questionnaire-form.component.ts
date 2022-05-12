import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css']
})

export class QuestionnaireFormComponent implements OnInit {
  questionnaireData:any
 totalScore=0
 id:any;
questionnaireForm:FormGroup
  captcha: any;
  submited:any=null;
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,) {
   this.id = this.route.snapshot.paramMap.get('id')
    this.questionnaireForm=this.fb.group({
      aissment: this.fb.array([]) 
    })
    this.httpService.getdetails(this.id).subscribe((data:any)=>{
      console.log(data);
      this.getquestion(data?.category)
      
    })
   }

  ngOnInit(): void {
  }
getquestion(category:any){
  this.httpService.findByCategory(category).subscribe(data=>{
 this.questionnaireData=data
 let control = <FormArray>this.questionnaireForm.get('aissment');
 this.questionnaireData.map((item:any)=>{
  control.push(
    this.fb.group({
      question: [item.parameter, Validators.required],      
      answer:['',Validators.required]   ,
      score:[''] ,
      maxScore:['']    
    })
  );
   
 })

 
    
  })
}

get nameAissment(): FormArray {
  return this.questionnaireForm.get('aissment') as FormArray;
}

removeAissment(index:number) {
  let control = <FormArray>this.questionnaireForm.get('aissment');
  control.removeAt(index)
}


addAissment() {
  let control = <FormArray>this.questionnaireForm.get('aissment');
  control.push(
    this.fb.group({
      question: ['', Validators.required],      
      answer:['',Validators.required],
      score:[''],
      maxScore:['']    
    })
  );
 
}
resolved(captchaResponse: any) {
  this.captcha = captchaResponse;
}


submitQuestionnaire(){
  if (this.questionnaireForm.valid ) {
    let  i=0;
 
  for(let item of this.questionnaireData){
    let control = <FormArray>this.questionnaireForm.get('aissment');
    item.options.map((data:any)=>{
      if(data.answer=== control.at(i).get('answer')?.value){
        control.at(i).get('score')?.setValue(data.score)
        control.at(i).get('score')?.updateValueAndValidity()
        control.at(i).get('maxScore')?.setValue(item.maxScore)
        control.at(i).get('maxScore')?.updateValueAndValidity()
        data.score= Number( data.score);
   this.totalScore+=data.score;
      }
    })
    i++;   
  }


  this.httpService.questionnaireAissment({
    userId:this.id,
    totalScore:this.totalScore,
    category:this.questionnaireData[0].category,
    questionAns:this.questionnaireForm.value.aissment

  }).subscribe((data:any)=>{
    console.log(data);
    this.toast.success(data);
    const url='dashboard/member/viewQuestionnaire/'+this.id
    window.location.href=url
  })
  }
  else if (!this.captcha) {
    this.submited = true;
    this.toast.error('Please verify that you are not a robot.');
  }
  else {

    this.submited = true;
    this.toast.error('Please Fill Required Field');
  }
 

  
}

}
