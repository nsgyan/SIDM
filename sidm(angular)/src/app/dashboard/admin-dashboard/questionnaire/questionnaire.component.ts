import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      options: this.fb.array([]) ,
    })
    this.addOptions()
  }
  ngOnInit(): void {
  }
 
 
  option(): FormArray {
    return this.questionnaire.get("options") as FormArray
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
 


 
 
 
  onSubmit() {
    
    if(this.questionnaire.valid){
      this.httpService.postQuestionnaire({
      category:this.questionnaire.value.category,
      parameter:this.questionnaire.value.parameter,
      maxScore:this.questionnaire.value.maxScore, 
      options:this.questionnaire.value.options, 
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

  
  
 
 
}
 