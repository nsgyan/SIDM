import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "src/app/shared/services/http.service";


@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css']
})

export class QuestionnaireFormComponent implements OnInit {
  questionnaireData:any
  uploadDocuments:any
  userData:any
 totalScore=0;
 static:any=false;
 id:any;
 lastIndex!:number;
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
      aissment: this.fb.array([]) ,
      staticAnswer:[''],
      staticTable:this.fb.array([]) ,
      staticScore:[''] ,
      staticMaxScore:[20] ,
    })
    this.httpService.getdetails(this.id).subscribe((data:any)=>{
 
      if(data.category==='cat4'){
this.static=true
      }
      console.log(data);
      this.getquestion(data?.category,data?.typeOfApplicant)
      this.userData=data
      if ( this.userData.category === 'cat1') {
        this.userData.category = 'C1'
      }
      else if ( this.userData.category === 'cat2') {
        this.userData.category = 'C2'
      }
      else if ( this.userData.category === 'cat3') {
        this.userData.category = 'C3'
      }
      else if ( this.userData.category === 'cat4') {
        this.userData.category = 'C4'
      }
   
      
    })
   }

  ngOnInit(): void {
    this.addStaticQuestion()
  }


getquestion(category:any,typeOfApplicant:any){
  this.httpService.findByCategory({category:category,
    typeOfApplicant:typeOfApplicant}).subscribe((data:any)=>{
      console.log(data.length);
      this.lastIndex=data.length-1
      
 this.questionnaireData=data
 let control = <FormArray>this.questionnaireForm.get('aissment');
 this.questionnaireData.map((item:any)=>{
  control.push(
    this.fb.group({
      question: [item.parameter],      
      answer:[''],
      uploadDocuments:[''],
      description:[''],
      score:[''] ,
      inputType:[item.inputType],
      option:[],
      maxScore:[''] ,
      parameterDescription:[item.parameterDescription]
    })
  );
   
 })
 let j=0;
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
     console.log(item.inputType,j);
     
        control.at(j).get('answer')?.setValidators(Validators.required)
        control.at(j).get('answer')?.updateValueAndValidity()
       }
       j++;
}

 
    
  })
}

get nameAissment(): FormArray {
  return this.questionnaireForm.get('aissment') as FormArray;
}

get staticTable(): FormArray {
  return this.questionnaireForm.get('staticTable') as FormArray;
}
removeStaticQuestion(index:number) {
  let control = <FormArray>this.questionnaireForm.get('staticTable');
  control.removeAt(index)
}


addStaticQuestion() {
  let control = <FormArray>this.questionnaireForm.get('staticTable');
  control.push(
    this.fb.group({
      product: [''], 
      uploadDocuments:[''],
      description:[''],
      IcContent:[''],
    })
  );
 
}

removeAissment(index:number) {
  let control = <FormArray>this.questionnaireForm.get('aissment');
  control.removeAt(index)
}


addAissment() {
  let control = <FormArray>this.questionnaireForm.get('aissment');
  control.push(
    this.fb.group({
      question: [''], 
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

staticTableChangeListener($event: any,index:any){
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
      let control = <FormArray>this.questionnaireForm.get('staticTable');
      control.at(index).get('uploadDocuments')?.setValue(data.body)
      control.at(index).get('uploadDocuments')?.updateValueAndValidity()
    })

    }
  }
  else {
    this.toast.error('File uploaded is invalid!')
  }
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
submitStaticQuestionnaire(){

  let j=0;

let staticAnswer=this.questionnaireForm.value.staticAnswer
if(staticAnswer==="More than 05 type"){
  this.questionnaireForm.get('staticScore')?.setValue(10)
  this.questionnaireForm.get('staticScore')?.updateValueAndValidity()
  this.totalScore+=10
}else if(staticAnswer==="03-04 types"){
  this.questionnaireForm.get('staticScore')?.setValue(7)
  this.questionnaireForm.get('staticScore')?.updateValueAndValidity()
  this.totalScore+=7
}else if(staticAnswer==="02 types of products"){
  this.questionnaireForm.get('staticScore')?.setValue(5)
  this.questionnaireForm.get('staticScore')?.updateValueAndValidity()
  this.totalScore+=5
}
else if(staticAnswer==="Single product"){
  this.questionnaireForm.get('staticScore')?.setValue(2)
  this.questionnaireForm.get('staticScore')?.updateValueAndValidity()
  this.totalScore+=2
}  console.log(this.totalScore,this.questionnaireForm);
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


  this.httpService.staticAissmentQuestionnaire({
    userId:this.id,
    totalScore:this.totalScore,
    category:this.questionnaireData[0].category,
    questionAns:this.questionnaireForm.value.aissment,
    staticAnswer:this.questionnaireForm.value.staticAnswer,
    staticTable:this.questionnaireForm.value.staticTable,
    staticMaxScore:this.questionnaireForm.value.staticMaxScore,
    staticScore:this.questionnaireForm.value.staticScore


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
