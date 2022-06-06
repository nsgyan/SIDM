import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-assessor-questionnaire',
  templateUrl: './assessor-questionnaire.component.html',
  styleUrls: ['./assessor-questionnaire.component.css']
})
export class AssessorQuestionnaireComponent implements OnInit {
  allFormsData: any;
  page:any='sd';
  index=0;
  filter:FormGroup;
  itemPerPage = 10;
  applicantData:any;

  id: any;
  submited: boolean=false;
  constructor(private httpService: HttpService,
    private toast: ToastrService,
    private localStorage: LocalStorageService,
    private routes: Router,
    private fb: FormBuilder,
    public dialog: MatDialog) { 
      this.getdata('sdaf')
      this.filter= this.fb.group({
        category:['',Validators.required],
        typeOfapplicant:['',Validators.required]
      })
    }

  ngOnInit(): void {
  }

  getdata(type:string) {
    this.httpService.getData(this.page, this.itemPerPage).subscribe((data: any) => {
      data?.data.map((item: any) => {
        if (item.category === 'cat1') {
          item.category = 'C1 '
        }
        else if (item.category === 'cat2') {
          item.category = 'C2'
        }
        else if (item.category === 'cat3') {
          item.category = 'C3'
        }
        else {
          item.category = 'C4'
        }
        if (item.typeOfApplicant === 'L') {
          item.typeOfApplicant = 'Large'
        }
        else if (item.typeOfApplicant === 'M') {
          item.typeOfApplicant = 'Medium'
        }
        else {
          item.typeOfApplicant = 'SME/SSI/START-UP'
        }
        const format = 'dd-MMM-yy';
        const locale = 'en-US';
        item.createAt = formatDate(item.createAt, format, locale)
        // console.log(data.createAt.type);

        // data.createAt = formatDate(data.createAt, 'yyyy-MM-dd', 'en-US')
        item.panNumberOfOrganization = item.panNumberOfOrganization;

      })
      this.applicantData=data.data
     

    }, err => {
      this.toast.error(err.error);
      this.routes.navigate(['login/admin'])

    })

  }
  filterData(){
    if(this.filter.valid){
this.httpService.assessmentsList(this.filter.value.category,this.filter.value.typeOfapplicant).subscribe(data=>{
  this.applicantData=data
})
    }
    else{
      this.submited = true;
      this.toast.error('Please Fill Required Field');
    }

  }
 
}
