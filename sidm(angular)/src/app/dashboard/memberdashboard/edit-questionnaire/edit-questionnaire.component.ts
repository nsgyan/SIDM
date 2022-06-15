import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.css']
})
export class EditQuestionnaireComponent implements OnInit {

  questionnaireData:any
  uploadDocuments:any
  userData:any
 totalScore=0;
 static:any=false;
 id:any;
 lastIndex:number=0;
questionnaireForm:FormGroup
  captcha: any;
  submited:any=null;
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private routes:Router) {
      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getdetails(this.id).subscribe((data:any)=>{
 
        if(data.category==='cat4'){
  this.static=true
        }
        console.log(data);    
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
      this.questionnaireForm=this.fb.group({
        aissment: this.fb.array([]) ,
        staticAnswer:[''],
        staticTable:this.fb.array([]) ,
        staticScore:[''] ,
        staticMaxScore:[''] ,
        secoundStaticAnswer:[''],
        secoundStaticTable:this.fb.array([]) ,
        secoundStaticScore:[''] ,
        secoundStaticMaxScore:[''] ,
        adminRemark:[''],
        questionnaireStatus:['']
      })
    this.httpService.getQuestionnaireAissment(this.id).subscribe((data:any)=>{
      let control = <FormArray>this.questionnaireForm.get('aissment');
      this.questionnaireData=data

if(this.questionnaireData.adminRemark){
  this.questionnaireForm.get('adminRemark')?.setValue(this.questionnaireData.adminRemark)
  this.questionnaireForm.get('adminRemark')?.updateValueAndValidity()
  this.questionnaireForm.get('questionnaireStatus')?.setValue(this.questionnaireData.status)
  this.questionnaireForm.get('questionnaireStatus')?.updateValueAndValidity()
}


      data.questionAns.map((item:any)=>{
        this.lastIndex= this.lastIndex+1
       control.push(
         this.fb.group({
           question: [item.question],      
           answer:[item.answer],
           uploadDocuments:[item.uploadDocuments],
           description:[item.description],
           score:[item.score],     
           inputType:[item.inputType],
           option:[item.option],
           maxScore:[[item.maxScore],] ,
           parameterDescription:[item.parameterDescription]
         })
       );
       if(item.uploadDocuments){
        item.uploadDocuments = environment.download + item.uploadDocuments
      }
        
      })
   this.lastIndex= this.lastIndex-1

      


      let j=0;
      for(let item of this.questionnaireData.questionAns){ 
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
      
      
 if(this.questionnaireData?.secoundStaticAnswer){
  this.static=true
  this.questionnaireForm.get('secoundStaticMaxScore')?.setValue(20)
  this.questionnaireForm.get('secoundStaticMaxScore')?.updateValueAndValidity()
  this.questionnaireForm.get('secoundStaticAnswer')?.setValue(this.questionnaireData.secoundStaticAnswer)
  this.questionnaireForm.get('secoundStaticAnswer')?.updateValueAndValidity()
  this.questionnaireForm.get('secoundStaticScore')?.setValue(this.questionnaireData.secoundStaticScore)
  this.questionnaireForm.get('secoundStaticScore')?.updateValueAndValidity()
  let staticControl=<FormArray>this.questionnaireForm.get('secoundStaticTable');
  data.secoundStaticTable.map((item:any)=>{
    staticControl.push(
      this.fb.group({
        product: [item.product], 
        IcContent:[item.IcContent],
        answer:[item.answer]
      })
    );
    if(item.uploadDocuments){
      item.uploadDocuments = environment.download + item.uploadDocuments
    }
  })
}
     if( this.questionnaireData?.staticAnswer){
      this.static=true
      this.questionnaireForm.get('staticMaxScore')?.setValue(10)
      this.questionnaireForm.get('staticMaxScore')?.updateValueAndValidity()
      this.questionnaireForm.get('staticAnswer')?.setValue(this.questionnaireData.staticAnswer)
      this.questionnaireForm.get('staticAnswer')?.updateValueAndValidity()
      this.questionnaireForm.get('staticScore')?.setValue(this.questionnaireData.staticScore)
      this.questionnaireForm.get('staticScore')?.updateValueAndValidity()
      let staticControl=<FormArray>this.questionnaireForm.get('staticTable');
      data.staticTable.map((item:any)=>{
        staticControl.push(
          this.fb.group({
            product: [item.product], 
            uploadDocuments:[item.uploadDocuments],
            description:[item.description],
            IcContent:[item.IcContent],
          })
        );
        if(item.uploadDocuments){
          item.uploadDocuments = environment.download + item.uploadDocuments
        }
      })
    }
     
    },err=>{
      this.routes.navigate(['login/admin'])
    })
   console.log(this.questionnaireForm);
   
   
   }

  ngOnInit(): void {
  }


  


get nameAissment(): FormArray {
  return this.questionnaireForm.get('aissment') as FormArray;
}

get staticTable(): FormArray {
  return this.questionnaireForm.get('staticTable') as FormArray;
}
get secoundStaticTable(): FormArray {
  return this.questionnaireForm.get('secoundStaticTable') as FormArray;
}



removeStaticQuestion(index:number) {
  let control = <FormArray>this.questionnaireForm.get('staticTable');
  control.removeAt(index)
}
removeSecoundStaticTable(index:number) {
  let control = <FormArray>this.questionnaireForm.get('secoundStaticTable');
  control.removeAt(index)
}

addsecoundStaticQuestion() {
  let control = <FormArray>this.questionnaireForm.get('secoundStaticTable');
  control.push(
    this.fb.group({
      product: [''],
      IcContent:[''],
      answer:['']
    })
  );
 
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


submitQuestionnaire(status:string){
  
let j=0;
console.log(this.questionnaireForm);



  if (this.questionnaireForm.valid ) {
    let  i=0;
 
  for(let item of this.questionnaireData.questionAns){
   
    let control = <FormArray>this.questionnaireForm.get('aissment');
    control.at(i).get('maxScore')?.setValue(item.maxScore)
    control.at(i).get('maxScore')?.updateValueAndValidity()
    if(item.inputType==='singleSelect'){
    item.option.map((data:any)=>{
      if(data.answer=== control.at(i).get('answer')?.value){
        data.score= Number( data.score);
        control.at(i).get('score')?.setValue(data.score)
        control.at(i).get('score')?.updateValueAndValidity()   
      
   this.totalScore+=data.score;
      }
    })
    control.at(i).get('inputType')?.setValue(item.inputType)
    control.at(i).get('inputType')?.updateValueAndValidity()
    control.at(i).get('option')?.setValue(item.option)
    control.at(i).get('option')?.updateValueAndValidity()
  }
    else if(item.inputType==='multiSelect'){
      let score=0;
const multiSelectsingleSelect=control.at(i).get('answer')?.value;
multiSelectsingleSelect.map((options:any)=>{
  item.option.map((optionItems:any)=>{
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
control.at(i).get('option')?.setValue(item.option)
control.at(i).get('option')?.updateValueAndValidity()
control.at(i).get('score')?.setValue(score)
control.at(i).get('score')?.updateValueAndValidity()
    }
      i++;  
  }


  this.httpService.updateQuestionnaireAissmentAdmin({
    id:this.questionnaireData._id,
    userId:this.id,
    totalScore:this.totalScore,
    category:this.questionnaireData.category,
    questionAns:this.questionnaireForm.value.aissment,
    adminRemark:this.questionnaireForm.value.adminRemark,
    questionnaireStatus:status,


  }).subscribe((data:any)=>{
    if(status==='save'){
      this.toast.warning('Your Questionnaire is saved successfully please make offline payment and the submit')
     }else{
      this.toast.success(data);
     }
const url='dashboard/member/viewQuestionnaire/'+this.id
window.location.href=url
  })
  }
  else {

    this.submited = true;
    this.toast.error('Please Fill all questions');
  }
 

  
}
submitStaticQuestionnaire(status:string){
  if(status==='save'){
    this.toast.warning('Your Questionnaire is saved successfully please make offline payment and the submit')
   }
let  staticAnswer=this.questionnaireForm.value.staticAnswer
let  secoundStaticAnswer=this.questionnaireForm.value.secoundStaticAnswer
if(secoundStaticAnswer==="Build to Customer Print"){
  this.questionnaireForm.get('secoundStaticScore')?.setValue(6)
  this.questionnaireForm.get('secoundStaticScore')?.updateValueAndValidity()
  this.totalScore+=6
}else if(secoundStaticAnswer==="Under ToT from FOEM"){
  this.questionnaireForm.get('secoundStaticScore')?.setValue(10)
  this.questionnaireForm.get('secoundStaticScore')?.updateValueAndValidity()
  this.totalScore+=10
}else if(secoundStaticAnswer==="Under ToT from DRDO"){
  this.questionnaireForm.get('secoundStaticScore')?.setValue(15)
  this.questionnaireForm.get('secoundStaticScore')?.updateValueAndValidity()
  this.totalScore+=15
}
else if(secoundStaticAnswer==="Indigenous, in-house design"){
  this.questionnaireForm.get('secoundStaticScore')?.setValue(20)
  this.questionnaireForm.get('secoundStaticScore')?.updateValueAndValidity()
  this.totalScore+=20
} 
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
} 
  if (this.questionnaireForm.valid ) {
    let  i=0;
    for(let item of this.questionnaireData.questionAns){
   
      let control = <FormArray>this.questionnaireForm.get('aissment');
      control.at(i).get('maxScore')?.setValue(item.maxScore)
      control.at(i).get('maxScore')?.updateValueAndValidity()
      if(item.inputType==='singleSelect'){
      item.option.map((data:any)=>{
        if(data.answer=== control.at(i).get('answer')?.value){
          data.score= Number( data.score);
          control.at(i).get('score')?.setValue(data.score)
          control.at(i).get('score')?.updateValueAndValidity()   
        
     this.totalScore+=data.score;
        }
      })
      control.at(i).get('inputType')?.setValue(item.inputType)
      control.at(i).get('inputType')?.updateValueAndValidity()
      control.at(i).get('option')?.setValue(item.option)
      control.at(i).get('option')?.updateValueAndValidity()
    }
      else if(item.inputType==='multiSelect'){
        let score=0;
  const multiSelectsingleSelect=control.at(i).get('answer')?.value;
  multiSelectsingleSelect.map((options:any)=>{
    item.option.map((optionItems:any)=>{
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
  control.at(i).get('option')?.setValue(item.option)
  control.at(i).get('option')?.updateValueAndValidity()
  control.at(i).get('score')?.setValue(score)
  control.at(i).get('score')?.updateValueAndValidity()
      }
        i++;  
    }

console.log(this.questionnaireForm);


  this.httpService.updateStaticAissmentQuestionnaire({
    id:this.questionnaireData._id,
    userId:this.id,
    totalScore:this.totalScore,
    category:this.questionnaireData.category,
    questionAns:this.questionnaireForm.value.aissment,
    staticAnswer:this.questionnaireForm.value.staticAnswer,
    staticTable:this.questionnaireForm.value.staticTable,
    staticMaxScore:this.questionnaireForm.value.staticMaxScore,
    staticScore:this.questionnaireForm.value.staticScore,
    adminRemark:this.questionnaireForm.value.adminRemark,
    secoundStaticAnswer:this.questionnaireForm.value.secoundStaticAnswer,
    secoundStaticTable:this.questionnaireForm.value.secoundStaticTable ,
    secoundStaticScore:this.questionnaireForm.value.secoundStaticScore ,
    secoundStaticMaxScore:this.questionnaireForm.value.secoundStaticMaxScore, 
    questionnaireStatus:status,


  }).subscribe((data:any)=>{
 
    if(status==='save'){
      this.toast.warning('Your Questionnaire is saved successfully please make offline payment and the submit')
     }else{
      this.toast.success(data);
     }
    const url='dashboard/member/viewQuestionnaire/'+this.id
    window.location.href=url
  })
  }
  else {

    this.submited = true;
    this.toast.error('Please Fill all questions');
  }
}

}
