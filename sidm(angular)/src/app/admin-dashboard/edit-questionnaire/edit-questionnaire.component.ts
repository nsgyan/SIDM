import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-edit-questionnaire',
  templateUrl: './edit-questionnaire.component.html',
  styleUrls: ['./edit-questionnaire.component.css']
})
export class EditQuestionnaireComponent implements OnInit {

 
  questionnaire!:FormGroup;
  editQuestionnaire!:FormGroup;
  captcha: any;
  submited: boolean=false;
 
  constructor(private fb:FormBuilder,
    private httpService: HttpService,
    private routes: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,) {
      const id = this.route.snapshot.paramMap.get('id')
      this.httpService.getQuestionnaireById(id).subscribe((data:any)=>{
        console.log(data);
        
        this.questionnaire=this.fb.group({
          category:[data.category,Validators.required],
          parameter:[data.parameter,Validators.required],
          maxWeightage:[data.maxWeightage,Validators.required],
          options: this.fb.array([]) ,
        })
        let control = <FormArray>this.questionnaire.get('options');
        data.options.map((item:any)=>{
         control.push(
           this.fb.group({
            answer: [item.answer,Validators.required],
      weightage:[item.weightage,Validators.required],
           })
         );
          
        })

      })


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
    const id = this.route.snapshot.paramMap.get('id')
    if(this.questionnaire.valid){
      this.httpService.updateQuestionnaireById(id,{
      category:this.questionnaire.value.category,
      parameter:this.questionnaire.value.parameter,
      maxWeightage:this.questionnaire.value.maxWeightage, 
      options:this.questionnaire.value.options, 
      }).subscribe((data:any)=>{
      
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