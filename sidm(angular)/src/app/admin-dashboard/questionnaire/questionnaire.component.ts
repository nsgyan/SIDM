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
    
  displayedColumns: string[] = [ 'category', 'parameter', 'maxWeightage','action'];
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
      options: this.fb.array([]) ,
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
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
 