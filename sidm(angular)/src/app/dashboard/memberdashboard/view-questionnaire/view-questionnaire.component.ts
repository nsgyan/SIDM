import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  aissmentdata:any
  constructor(
    private httpService: HttpService,
    private fb:FormBuilder,
    private toast: ToastrService,
    private route: ActivatedRoute,) { 
    this.id = this.route.snapshot.paramMap.get('id')
    this.httpService.getQuestionnaireAissment(this.id).subscribe(data=>{
      console.log(data);
      this.aissmentdata=data
      
    })
  }

  ngOnInit(): void {
  }

}