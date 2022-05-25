import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.css']
})
export class ViewQuestionnaireComponent implements OnInit {
  id:any
  maxScore:any=0;
 assessorScore:any=0;
  questionnaireForm:FormGroup
  aissmentdata:any
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { 
    this.id = this.route.snapshot.paramMap.get('id')
    this.questionnaireForm=this.fb.group({
      aissment: this.fb.array([]) 
    })
    this.httpService.getQuestionnaireAissment(this.id).subscribe((data:any)=>{
      console.log(data);
      data[0].questionAns.map((item:any)=>{
        item.maxScore= Number( item.maxScore);
        this.maxScore=this.maxScore+item.maxScore
        item.assessorScore= Number( item.assessorScore);
        this.assessorScore=this.assessorScore+item.assessorScore
        
        
        if(item.uploadDocuments){
          item.uploadDocuments = environment.download + item.uploadDocuments
        }
      })
      this.aissmentdata=data
      
    })
  }
  get nameAissment(): FormArray {
    return this.questionnaireForm.get('aissment') as FormArray;
  }

  ngOnInit(): void {
  }
  openModel(data:any){
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '500px',
      data: {data: data,type:'ViewQuestionnaire'},
    });
    
  }
}
