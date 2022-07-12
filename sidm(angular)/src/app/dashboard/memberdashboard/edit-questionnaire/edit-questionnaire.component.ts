import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
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
  assessor: any;
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private routes:Router,
      private localStorage: LocalStorageService,) { 
      let type= this.localStorage.get('type');
      if(type!=="member"){
  this.localStorage.clearLocalStorage()
  this.routes.navigate(['/login/member'])
      }

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
        adminRemark:[],
        doccumentAskedByAdmin:[null],
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
  this.questionnaireForm.get('doccumentAskedByAdmin')?.setValue(this.questionnaireData.doccumentAskedByAdmin)
  this.questionnaireForm.get('doccumentAskedByAdmin')?.updateValueAndValidity()
}

if(this.questionnaireData.doccumentAskedByAdmin){
  this.questionnaireData.doccumentAskedByAdmin = environment.download + this.questionnaireData.doccumentAskedByAdmin
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
          assessor:[item.assessor],
          option:[item.option],
          maxScore:[item.maxScore,] ,
          applicantAnswer:[item.applicantAnswer?item.applicantAnswer:item.answer],
          adminRemark:[item.adminRemark?item.adminRemark:''],
          adminAnswer:[item.adminAnswer?item.adminAnswer:''],
          table:this.fb.array([]) ,
          parameterDescription:[item.parameterDescription]
         })
       );
       if(item.uploadDocuments){
        item.uploadDocuments = environment.download + item.uploadDocuments
      }
      
        
      })
   this.lastIndex= this.lastIndex-1

      let j=0;
      if(data.category==='cat4'){
        data.questionAns.map((item:any)=>{
          item.table.map((tableData:any)=>{
            if(j===2){
              this.addTable(j).push( this.fb.group({
                product: [tableData.product],
                IcContent:[tableData.IcContent],
                answer:[tableData.answer]
              }))
            }
            else if(j===4){
              this.addTable(j).push(  this.fb.group({
                product: [tableData.product], 
                uploadDocuments:[tableData.uploadDocuments],
                description:[tableData.description],
                IcContent:[tableData.IcContent],
              }))
            }
  
          })
          j++;
        })
  
         j=0;
       }
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
     this.questionnaireData.questionAns.map((quest:any)=>{
      quest.table.map((item:any)=>{
       if(item.uploadDocuments){
        item.uploadDocuments = environment.download + item.uploadDocuments
       }
    })})
   
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
      maxScore:['']    
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

adminRequiredDoccument($event: any){
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

      this.questionnaireForm.get('doccumentAskedByAdmin')?.setValue(data.body)
      this.questionnaireForm.get('doccumentAskedByAdmin')?.updateValueAndValidity()
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

delete(conttrolName: string) {
  if (conttrolName === 'documentGstCertificate') {
    this.questionnaireForm.get('documentGstCertificate')?.reset()
    this.questionnaireForm.get('documentGstCertificate')?.updateValueAndValidity()
    this.questionnaireData.doccumentAskedByAdmin = null

  }


}


submitQuestionnaire(status:string){
  
let j=0;
console.log(this.questionnaireForm);



  if (this.questionnaireForm.valid ) {
    let  i=0;
 
  for(let item of this.questionnaireData.questionAns){
   
    let control = <FormArray>this.questionnaireForm.get('aissment');
    if(item.adminAnswer!==control.at(i).value.answer){
    control.at(i).get('applicantAnswer')?.setValue(control.at(i).value.answer)
    control.at(i).get('applicantAnswer')?.updateValueAndValidity()
    control.at(i).get('maxScore')?.setValue(item.maxScore)
    control.at(i).get('maxScore')?.updateValueAndValidity()}
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
    doccumentAskedByAdmin:this.questionnaireForm.value.doccumentAskedByAdmin,
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
