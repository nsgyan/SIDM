
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  singleSelect:boolean=false
multiSelect:boolean=false
  toppings = new FormControl();

  toppingList: string[] = ['textBox', 'upload', 'singleSelect','multiSelect'];
  questionnaire:FormGroup;
  editQuestionnaire!:FormGroup;
  captcha: any;
  submited: boolean=false;
 
  constructor(private fb:FormBuilder,
    private httpService: HttpService,
    private toast: ToastrService,
    private routes: Router,
    private localStorage: LocalStorageService,) {
      let type= this.localStorage.get('type');
      if(type!=="admin"){
this.localStorage.clearLocalStorage()
const url='/login/admin'
window.location.href=url
      }
    this.questionnaire=this.fb.group({
      category:['',Validators.required],
      typeOfApplicant:['',Validators.required],
      parameter:['',Validators.required],
      maxScore:['',Validators.required],
      inputType:['',Validators.required],
      upload:['',Validators.required],
      textBox:['',Validators.required],
      options: this.fb.array([]) ,
      parameterDescription:['']
    })
  }
  ngOnInit(): void {
  }
 
 
  option(): FormArray {
    return this.questionnaire.get("options") as FormArray
  }
  inputType(): FormArray {
    return this.questionnaire.get("inputType") as FormArray
  }
 get options(): FormArray {
    return this.questionnaire.get("options") as FormArray
  }
 
  newOption(): FormGroup {
    return this.fb.group({
      answer: ['',Validators.required],
      score:['',Validators.required],
    })
  }
 
 
  addOptions() {
    this.option().push(this.newOption());
  }
 
 
  removeOption(quesIndex:number) {
    this.option().removeAt(quesIndex);
  }
 


  optionType(type:any)
  {
    if(type==='singleSelect' &&! this.singleSelect&&!this.multiSelect){
      this.singleSelect=!this.singleSelect
      this.removeAllOption()
      if(this.singleSelect)
      {
        this.addOptions()
      }
    }
    else if(type==='multiSelect'&&! this.singleSelect&&!this.multiSelect){
      this.multiSelect=!this.multiSelect
      this.removeAllOption()
      if(this.multiSelect)
      {
        this.addOptions()
      }
    }
    else{
      this.removeAllOption()
    }
    
  }
 
 
  onSubmit() {
    if(this.questionnaire.value.textBox|| this.questionnaire.value.upload)
    {
      this.questionnaire.get('inputType')?.clearValidators()
      this.questionnaire.get('inputType')?.updateValueAndValidity()
    }
     if(this.questionnaire.value.inputType)
    {
      this.questionnaire.get('textBox')?.clearValidators()
      this.questionnaire.get('textBox')?.updateValueAndValidity()
      this.questionnaire.get('upload')?.clearValidators()
      this.questionnaire.get('upload')?.updateValueAndValidity()
    }
    
    if(this.questionnaire.valid){
      this.httpService.postQuestionnaire({
      category:this.questionnaire.value.category,
      parameter:this.questionnaire.value.parameter,
      typeOfApplicant:this.questionnaire.value.typeOfApplicant,
      maxScore:this.questionnaire.value.maxScore, 
      options:this.questionnaire.value.options, 
      inputType:this.questionnaire.value.inputType,
      textBox:this.questionnaire.value.textBox ? true:false,
      upload:this.questionnaire.value.upload?true:false,
      parameterDescription:this.questionnaire.value.parameterDescription
      }).subscribe((data:any)=>{
        console.log(data);
        this.toast.success(data);
        let url: string = "/dashboard/admin/questionnaireList"
        this.routes.navigateByUrl(url);
        
      },error => {
        this.toast.error('Please Login again');
        this.localStorage.clearLocalStorage()
        window.location.reload()
        this.routes.navigate(['login/member'])
      })
    }
    
    else {
      this.questionnaire.get('inputType')?.setValidators(Validators.required)
      this.questionnaire.get('inputType')?.updateValueAndValidity()
      this.questionnaire.get('textBox')?.setValidators(Validators.required)
      this.questionnaire.get('textBox')?.updateValueAndValidity()
      this.questionnaire.get('upload')?.setValidators(Validators.required)
      this.questionnaire.get('upload')?.updateValueAndValidity()
      this.submited = true;
      this.toast.error('Please Fill Required Field');
    }
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
 removeAllOption(){

  if(!this.singleSelect || !this.multiSelect){
    console.log('hello');
    
let i=this.option().length
while(i>0){
  --i;
  this.option().removeAt(i)
  
 
  

}

  }
 }
  
  
 
 
}
 