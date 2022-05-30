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
  uploadDocuments:any
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
      this.getquestion(data?.category,data?.typeOfApplicant)
      
    })
   }

  ngOnInit(): void {
  }


getquestion(category:any,typeOfApplicant:any){
  this.httpService.findByCategory({category:category,
    typeOfApplicant:typeOfApplicant}).subscribe(data=>{
 this.questionnaireData=data
 let control = <FormArray>this.questionnaireForm.get('aissment');
 this.questionnaireData.map((item:any)=>{
  control.push(
    this.fb.group({
      question: [item.parameter, Validators.required],      
      answer:[''],
      uploadDocuments:[''],
      description:[''],
      score:[''] ,
      inputType:[item.inputType],
      option:[],
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
      assessorScore:[''],     
      answer:[''],
      uploadDocuments:[''],
      description:[''],
      score:[''],
      inputType:[''],
      option:[''],
      maxScore:['']    
    })
  );
 
}
resolved(captchaResponse: any) {
  this.captcha = captchaResponse;
}


changeListener($event: any,index:any) {
  let file = $event.target.files;



  if (
    file[0].type == 'image/png' ||
    file[0].type == 'image/jpg' ||
    file[0].type == 'image/jpeg' ||
    file[0].type == 'application/pdf'
  ) {


    if (parseInt(file[0].size) > 2097152) {
    this.toast.error('file to large')
  }
  else {
    const date = 'Wed Feb 20 2019 00:00:00 GMT-0400 (Atlantic Standard Time)';
    const time = '7:00 AM';
    this.httpService.upload(file[0]).subscribe((data: any) => {
      let control = <FormArray>this.questionnaireForm.get('aissment');
      control.at(index).get('uploadDocuments')?.setValue(data.body)
      control.at(index).get('uploadDocuments')?.updateValueAndValidity()
    })

    }
  }
  else {
    this.toast.error('File uploaded is invalid!')
  }
}


submitQuestionnaire(){
let j=0;
console.log(this.questionnaireForm);

for(let item of this.questionnaireData){ 
  let control = <FormArray>this.questionnaireForm.get('aissment');
  if(item.textBox)
  {    control.at(j).get('description')?.setValidators(Validators.required)
      control.at(j).get('description')?.updateValueAndValidity()}    
   if(item.upload){
        control.at(j).get('uploadDocuments')?.setValidators(Validators.required)
        control.at(j).get('uploadDocuments')?.updateValueAndValidity()
      }
   if(item.inputType==='multiSelect'|| item.inputType==='singleSelect'){
        control.at(j).get('answer')?.setValidators(Validators.required)
        control.at(j).get('answer')?.updateValueAndValidity()
       }
       j++;
}
  if (this.questionnaireForm.valid ) {
    let  i=0;
 
  for(let item of this.questionnaireData){
   
    let control = <FormArray>this.questionnaireForm.get('aissment');
    control.at(i).get('maxScore')?.setValue(item.maxScore)
    control.at(i).get('maxScore')?.updateValueAndValidity()
    if(item.inputType==='singleSelect'){
    item.options.map((data:any)=>{
      if(data.answer=== control.at(i).get('answer')?.value){
        data.score= Number( data.score);
        control.at(i).get('score')?.setValue(data.score)
        control.at(i).get('score')?.updateValueAndValidity()   
      
   this.totalScore+=data.score;
      }
    })
    control.at(i).get('inputType')?.setValue(item.inputType)
    control.at(i).get('inputType')?.updateValueAndValidity()
    control.at(i).get('option')?.setValue(item.options)
    control.at(i).get('option')?.updateValueAndValidity()
  }
    else if(item.inputType==='multiSelect'){
      let score=0;
const multiSelectsingleSelect=control.at(i).get('answer')?.value;
multiSelectsingleSelect.map((options:any)=>{
  item.options.map((optionItems:any)=>{
if(optionItems.answer===options){
  optionItems.score=Number( optionItems.score);
score=score+optionItems.score
this.totalScore+=optionItems.score;
}

  })
}

)
control.at(i).get('inputType')?.setValue(item.inputType)
control.at(i).get('inputType')?.updateValueAndValidity()
control.at(i).get('option')?.setValue(item.options)
control.at(i).get('option')?.updateValueAndValidity()
control.at(i).get('score')?.setValue(score)
control.at(i).get('score')?.updateValueAndValidity()
    }
      i++;  
  }


  this.httpService.questionnaireAissment({
    userId:this.id,
    totalScore:this.totalScore,
    category:this.questionnaireData[0].category,
    questionAns:this.questionnaireForm.value.aissment,



  }).subscribe((data:any)=>{
    console.log(data);
    this.toast.success(data);
    const url='dashboard/member/viewQuestionnaire/'+this.id
    window.location.href=url
  })
  }
  else {

    this.submited = true;
    this.toast.error('Please Fill Required Field');
  }
 

  
}

}
