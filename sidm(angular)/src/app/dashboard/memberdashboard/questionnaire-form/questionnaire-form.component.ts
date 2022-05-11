import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.css']
})

export class QuestionnaireFormComponent implements OnInit {

  constructor(
    private httpService: HttpService,

    private route: ActivatedRoute,) {
    const id = this.route.snapshot.paramMap.get('id')
    this.httpService.getdetails(id).subscribe((data:any)=>{
      console.log(data);
      this.getquestion(data?.category)
      
    })
   }

  ngOnInit(): void {
  }
getquestion(category:any){
  this.httpService.findByCategory(category).subscribe(data=>{
    console.log(data);
    
  })
}
}
