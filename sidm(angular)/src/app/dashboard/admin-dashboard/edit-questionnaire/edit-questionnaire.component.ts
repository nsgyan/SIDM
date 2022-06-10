import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "src/app/shared/services/http.service";


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
  singleSelect: boolean=false;
  multiSelect: boolean=false;
 
  constructor(private fb:FormBuilder,
    private httpService: HttpService,
    private routes: Router,
    private route: ActivatedRoute,
    private toast: ToastrService,) {
      const id = this.route.snapshot.paramMap.get('id')
      this.httpService.getQuestionnaireById(id).subscribe((data:any)=>{
        console.log(data);
        
        this.questionnaire=this.fb.group({
          category:[data?.category,Validators.required],
          parameter:[data.parameter,Validators.required],
          typeOfApplicant:[data.typeOfApplicant,Validators.required],
          maxScore:[data.maxScore,Validators.required],
          inputType:[data.inputType,Validators.required],
          upload:[data.upload,Validators.required],
          textBox:[data.textBox,Validators.required],
          parameterDescription:[data.parameterDescription ?data.parameterDescription:''],
          options: this.fb.array([]) ,
        })
        if(data.inputType==='singleSelect'){
          this.singleSelect=true;
        }
        else if(data.inputType==='multiSelect'){
          this.multiSelect=true
        }
        let control = <FormArray>this.questionnaire.get('options');
        data.options?.map((item:any)=>{
         control.push(
           this.fb.group({
            answer: [item.answer,Validators.required],
      score:[item.score,Validators.required],
           })
         );
          
        })

      })


  }

  optionType(type:any)
  {
    if(type==='singleSelect'){
      this.singleSelect=!this.singleSelect
      this.removeAllOption()
      if(this.singleSelect)
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
    else{
      this.removeAllOption()
    }
    
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
      score: ['',Validators.required],
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
    if(this.questionnaire.value.textBox||this.questionnaire.value.upload)
    {
      this.questionnaire.get('inputType')?.clearValidators()
      this.questionnaire.get('inputType')?.updateValueAndValidity()
    }else if(this.questionnaire.value.inputType)
    {
      this.questionnaire.get('textBox')?.clearValidators()
      this.questionnaire.get('textBox')?.updateValueAndValidity()
      this.questionnaire.get('upload')?.clearValidators()
      this.questionnaire.get('upload')?.updateValueAndValidity()
    }
    
    if(this.questionnaire.valid){
      this.httpService.updateQuestionnaireById(id,{
        category:this.questionnaire.value.category,
        parameter:this.questionnaire.value.parameter,
        typeOfApplicant:this.questionnaire.value.typeOfApplicant,
        maxScore:this.questionnaire.value.maxScore, 
        options: this.questionnaire.value.options, 
        inputType:this.questionnaire.value.inputType,
        textBox:this.questionnaire.value.textBox ? true:false,
        upload:this.questionnaire.value.upload?true:false,
        parameterDescription:this.questionnaire.value.parameterDescription
      }).subscribe((data:any)=>{
      
        this.toast.success(data);
        let url: string = "/dashboard/admin/questionnaireList"
        this.routes.navigateByUrl(url);
      },err=>{
        this.routes.navigate(['login/admin'])
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