import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "src/app/shared/services/http.service";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";


@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css']
})

export class QuestionnaireFormComponent implements OnInit {
  questionnaireData:any
  uploadDocuments:any
  userData:any
  assessor:any=[]
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
    private routes:Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,) { 
      let type= this.localStorage.get('type');
      if(type!=="member"){
  this.localStorage.clearLocalStorage()
  this.routes.navigate(['/login/member'])
      }
      
   this.id = this.route.snapshot.paramMap.get('id')
   this.httpService.getassessor().subscribe((data:any)=>{
 data.map((item:any)=>{
  this.assessor.push({
    id:item._id,
    assessorName:item.assessorName,
    email:item.email,
    maxScore:null,
    score:null,
    remark:null,
    assessorDocument:null
  })

  })
    
    
  })
    this.questionnaireForm=this.fb.group({
      aissment: this.fb.array([]) ,  
    })
    this.httpService.getdetails(this.id).subscribe((data:any)=>{
 
      if(data.category==='cat4'){
this.static=true
this.questionnaireForm.get('staticMaxScore')?.setValue(10)
this.questionnaireForm.get('staticMaxScore')?.updateValueAndValidity()
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
      assessor:[this.assessor],
      option:[],
      maxScore:[''] ,
      applicantAnswer:[],
      table:this.fb.array([]),
      parameterDescription:[item.parameterDescription]
    })
  );
   
 })
 let j=0;
 if ( this.userData.category === 'C4') {
  this.addStatic(2)
  this.addStatic(4)
  }

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

 
console.log(this.questionnaireForm);

    
  })
}

get nameAissment(): FormArray {
  return this.questionnaireForm.get('aissment') as FormArray;
}



get table(): FormArray {
  let control = <FormArray>this.questionnaireForm.get('aissment');
  return control
    .at(4)
    .get('table') as FormArray;
}

get firsttable(): FormArray {
  let control = <FormArray>this.questionnaireForm.get('aissment');
  return control
    .at(2)
    .get('table') as FormArray;
}

addTable(empIndex: number): FormArray {
  let control = <FormArray>this.questionnaireForm.get('aissment');
  return control.at(empIndex).get('table') as FormArray;
}

addStaticTable(index:any): FormGroup {
  if(index==2){
  return  this.fb.group({
    product: [''],
    IcContent:[''],
    answer:['']
  })}
else {
  return  this.fb.group({
    product: [''], 
    uploadDocuments:[''],
    description:[''],
    IcContent:[''],
  })}
 
}
addStatic(empIndex: number) {
this.addTable(empIndex).push(this.addStaticTable(empIndex));
}
removeStatic(empIndex: number, skillIndex: number) {
  this.addTable(empIndex).removeAt(skillIndex);
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
      maxScore:['']   ,
      table:this.fb.array([]),
    })
  );
 
}
resolved(captchaResponse: any) {
  this.captcha = captchaResponse;
}

staticTableChangeListener($event: any,tableIndex:any,index:any){
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
      let control = <FormArray>this.addTable(tableIndex);
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


submitQuestionnaire(status:any){

let j=0;
console.log(this.questionnaireForm);


  if (this.questionnaireForm.valid  ) {
    let  i=0;
 
  for(let item of this.questionnaireData){
   
    let control = <FormArray>this.questionnaireForm.get('aissment');
    control.at(i).get('applicantAnswer')?.setValue(control.at(i).value.answer)
    control.at(i).get('applicantAnswer')?.updateValueAndValidity()
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
    status:status



  }).subscribe((data:any)=>{
    if(status==='save'){
      this.toast.warning('Your Questionnaire is saved successfully please make offline payment and the submit')
     }else{
      this.toast.success(data);}
    const url='dashboard/member/viewQuestionnaire/'+this.id
    window.location.href=url
  })
  }
  else if(this.questionnaireForm.valid &&!this.userData.offlinePaymentDetails ){
    this.toast.error('Please Submit Offline Payment Details');
  }
  else {

    this.submited = true;
    this.toast.error('Please Fill all questions');
  }
 

  
}
submitStaticQuestionnaire(status:any){

  let j=0;


console.log(this.totalScore,this.questionnaireForm);
  if (this.questionnaireForm.valid   ) {
    let  i=0;
 
  for(let item of this.questionnaireData){
   
    let control = <FormArray>this.questionnaireForm.get('aissment');
    control.at(i).get('applicantAnswer')?.setValue(control.at(i).value.answer)
    control.at(i).get('applicantAnswer')?.updateValueAndValidity()
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
    status:status


  }).subscribe((data:any)=>{
   if(status==='save'){
    this.toast.warning('Your Questionnaire is saved successfully please make offline payment and the submit')
   }else{
    this.toast.success(data);}
    const url='dashboard/member/viewQuestionnaire/'+this.id
    window.location.href=url
  })
  }
  else if(this.questionnaireForm.valid &&!this.userData.offlinePaymentDetails ){
    this.toast.error('Please Submit Offline Payment Details');
  }
  else {

    this.submited = true;
    this.toast.error('Please Fill all questions');
  }
}

}
