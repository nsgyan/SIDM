import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
    
  displayedColumns: string[] = ['createAt', 'category', 'parameter', 'weightage','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
  questionnaire:FormGroup;
  captcha: any;
  submited: boolean=false;
 
 
  constructor(private fb:FormBuilder,
    private httpService: HttpService,
    private toast: ToastrService,) {
this.httpService.getQuestionnaire().subscribe((data:any)=>{
  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
})
 
    this.questionnaire=this.fb.group({
      category:['',Validators.required],
      parameter:['',Validators.required],
      maxWeightage:['',Validators.required],
      options: this.fb.array([]),
    })
  }
  ngOnInit(): void {
  }
 
 
  options(): FormArray {
    return this.questionnaire.get("options") as FormArray
  }
 
 get option(): FormArray {
    return this.questionnaire.get("options") as FormArray
  }
 
  newoptions(): FormGroup {
    return this.fb.group({
      answer: ['',Validators.required],
      weightage: ['',Validators.required],
    })
  }
 
 
  addoptions() {
    this.options().push(this.options());
  }
 
 
  removeQuestion(quesIndex:number) {
    this.options().removeAt(quesIndex);
  }
  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }
 

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
      }).subscribe((data:any)=>{
        console.log(data);
        this.toast.success(data);
        
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

  selectChangeHandler(){
    this.addoptions()

  }
 
 
}
 