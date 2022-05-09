import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
    
  title = 'Nested FormArray Example Add Form Fields Dynamically';
 
  questionnaire:FormGroup;
 
 
  constructor(private fb:FormBuilder,
    private httpService: HttpService) {
 
    this.questionnaire=this.fb.group({
      category:['',Validators.required],
      typeOfApplicant:['',Validators.required],
      question: this.fb.array([
        
      ]) ,
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
      parameter: ['',Validators.required],
      maxWeightage: ['',Validators.required],
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
      answers: ['',Validators.required],
      score: ['',Validators.required],
    })
  }
 
  addQuestionOption(quesIndex:number) {
    this.QuestionOptions(quesIndex).push(this.newOption());
  }
 
  removeQuestionOption(quesIndex:number,optIndex:number) {
    this.QuestionOptions(quesIndex).removeAt(optIndex);
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

  keyPresschar(evt: any) {
    evt = (evt) ? evt : event;
    const charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
      ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
 
  onSubmit() {
    
    if(this.questionnaire.valid){
      this.httpService.postQuestionnaire({
      category:this.questionnaire.value.category,
       typeOfApplicant:this.questionnaire.value.typeOfApplicant,
      question:this.questionnaire.value.question, 
      }).subscribe(data=>{
        console.log(data);
        
      })
    
     
    }
  }
  selectChangeHandler(){
    this.addQuestion()
    this.addQuestionOption(0)

  }
 
 
}
 