import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-applicant-questionnaire',
  templateUrl: './applicant-questionnaire.component.html',
  styleUrls: ['./applicant-questionnaire.component.css']
})
export class ApplicantQuestionnaireComponent implements OnInit {
  id:any
  assessorScore:any=0;  
  maxScore:number=0;
  aissmentdata:any
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private routes: Router,
    public dialog: MatDialog
    ) { 
      
    this.id = this.route.snapshot.paramMap.get('id')
    this.httpService.getQuestionnaireAissment(this.id).subscribe((data:any)=>{
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
    },err=>{
      this.routes.navigate(['login/admin'])
    })
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
