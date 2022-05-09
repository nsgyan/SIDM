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
      category:'',
      typeOfApplicant:'',
      question: this.fb.array([]) ,
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
 
  question(): FormArray {
    return this.questionnaire.get("question") as FormArray
  }
 
 get questions(): FormArray {
    return this.questionnaire.get("question") as FormArray
  }
 
  newQuestion(): FormGroup {
    return this.fb.group({
      parameter: '',
      maxWeightage: '',
      option:this.fb.array([])
    })
  }
 
 
  addQuestion() {
    this.question().push(this.newQuestion());
  }
 
 
  removeQuestion(quesIndex:number) {
    this.question().removeAt(quesIndex);
  }
 

  QuestionOptions(quesIndex:number) : FormArray {
    return this.question().at(quesIndex).get("option") as FormArray
  }
 
  newOption(): FormGroup {
    return this.fb.group({
      answers: '',
      score: '',
    })
  }
 
  addQuestionOption(quesIndex:number) {
    this.QuestionOptions(quesIndex).push(this.newOption());
  }
 
  removeQuestionOption(quesIndex:number,optIndex:number) {
    this.QuestionOptions(quesIndex).removeAt(optIndex);
  }
 
  onSubmit() {
    console.log(this.questionnaire.value);
  }
 
 
}
 