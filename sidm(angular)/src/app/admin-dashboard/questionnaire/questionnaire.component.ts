import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

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
    private routes: Router,) {

    this.questionnaire=this.fb.group({
      category:['',Validators.required],
      parameter:['',Validators.required],
      maxWeightage:['',Validators.required],
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
      weightage:['',Validators.required],
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
      maxWeightage:this.questionnaire.value.maxWeightage, 
      options:this.questionnaire.value.options, 
      }).subscribe((data:any)=>{
        console.log(data);
        this.toast.success(data);
        let url: string = "/adminDashboard/questionnaireList"
        this.routes.navigateByUrl(url);
        
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
 