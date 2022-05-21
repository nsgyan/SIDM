import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.css']
})
export class ViewQuestionnaireComponent implements OnInit {
  id:any
  questionnaireForm:FormGroup
  aissmentdata:any
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,) { 
    this.id = this.route.snapshot.paramMap.get('id')
    this.questionnaireForm=this.fb.group({
      aissment: this.fb.array([]) 
    })
    this.httpService.getQuestionnaireAissment(this.id).subscribe(data=>{
      console.log(data);
      this.aissmentdata=data
      
    })
  }
  get nameAissment(): FormArray {
    return this.questionnaireForm.get('aissment') as FormArray;
  }

  ngOnInit(): void {
  }

}
