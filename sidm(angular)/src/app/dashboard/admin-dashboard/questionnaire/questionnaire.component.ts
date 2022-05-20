import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  dropdown:boolean=false
multiSelect:boolean=false
  toppings = new FormControl();

  toppingList: string[] = ['textBox', 'upload', 'dropdown','multiSelect'];
  questionnaire:FormGroup;
  editQuestionnaire!:FormGroup;
  captcha: any;
  submited: boolean=false;
 
  constructor(private fb:FormBuilder,
    private httpService: HttpService,
    private toast: ToastrService,
    private routes: Router,
    private localStorage: LocalStorageService,) {

    this.questionnaire=this.fb.group({
      category:['',Validators.required],
      parameter:['',Validators.required],
      maxScore:['',Validators.required],
      inputType:['',Validators.required],
      options: this.fb.array([]) ,
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
    if(type==='dropdown'){
      this.dropdown=!this.dropdown
      this.removeAllOption()
      if(this.dropdown)
      {
        this.addOptions()
      }
    }
    else if(type==='multiSelect'){
      this.multiSelect=!this.multiSelect
      this.removeAllOption()
      if(this.multiSelect)
      {
        this.addOptions()
      }
    }
    
  }
 
 
  onSubmit() {
    
    if(this.questionnaire.valid){
      this.httpService.postQuestionnaire({
      category:this.questionnaire.value.category,
      parameter:this.questionnaire.value.parameter,
      maxScore:this.questionnaire.value.maxScore, 
      options: this.dropdown ?this.questionnaire.value.options:null, 
      inputType:this.questionnaire.value.inputType
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
    else if (!this.captcha) {
      this.submited = true;
      this.toast.error('Please verify that you are not a robot.');
    }
    else {
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

  if(!this.dropdown || !this.multiSelect){
    console.log('hello');
    
let i=this.option().length
while(i>0){
  --i;
  this.option().removeAt(i)
  
 
  

}

  }
 }
  
  
 
 
}
 