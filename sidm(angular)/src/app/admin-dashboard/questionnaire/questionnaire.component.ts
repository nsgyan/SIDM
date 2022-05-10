import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
    
  title = 'Nested FormArray Example Add Form Fields Dynamically';
 
  questionnaire:FormGroup;
 
 
  constructor(private fb:FormBuilder) {
   
 
    this.questionnaire=this.fb.group({
      category:['',Validators.required],
      parameter:['',Validators.required],
      maxWeightage:['',Validators.required],
      option: this.fb.array([]) ,
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
 
  option(): FormArray {
    return this.questionnaire.get("option") as FormArray
  }
 
 get options(): FormArray {
    return this.questionnaire.get("option") as FormArray
  }
 
  newOption(): FormGroup {
    return this.fb.group({
      answer: '',
      weightage: '',
    })
  }
 
 
  addOptions() {
    this.option().push(this.newOption());
  }
 
 
  removeOption(quesIndex:number) {
    this.option().removeAt(quesIndex);
  }
 

 
 

 
 
 
  onSubmit() {
    console.log(this.questionnaire.value);
  }
 
 
}
 