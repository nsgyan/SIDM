import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { formatDate, Location } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment.prod';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-applicant',
  templateUrl: './view-applicant.component.html',
  styleUrls: ['./view-applicant.component.css']
})
export class ViewApplicantComponent implements OnInit {

   paymentDetails:any
  cat1 = true
  cat2 = true
  cat3 = true
  cat4 = true
  memberData: any;
  OfflinepaymentDetails: any;
  constructor(private route: ActivatedRoute,
    private httpService: HttpService,
    private localStorage: LocalStorageService,
    private toast: ToastrService,
    private location: Location, 
    public dialog: MatDialog,
    private routes:Router) {
    const id = this.route.snapshot.paramMap.get('id')
    this.httpService.getdetails(id)
      .subscribe((data: any) => {
        if (data?.category === 'cat1') {
          data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
        }
        else if (data?.category === 'cat2') {
          data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
        }
        else if (data?.category === 'cat3') {
          data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
        }
        else if (data?.category === 'cat4') {
          data.category = 'C4- Export Performance of Defence & Aerospace Products'
        }

        if (data?.typeOfApplicant === 'L') {
          data.typeOfApplicant = 'L – Large (Annual Turnover FY 2020-21 over   & above Rs 250 Crore)'
        }
        else if (data?.typeOfApplicant === 'M') {
          data.typeOfApplicant = 'M – Medium  (Annual Turnover FY 2020-21 between  Rs 75 to 250 Crore)'
        }
        else if (data?.typeOfApplicant === 'S') {
          data.typeOfApplicant = 'S – Small  (Annual Turnover FY 2020-21 less than Rs 75 Crore)'
        }
        if (data.documentGstCertificate) {
          data.documentGstCertificate = environment.download + data.documentGstCertificate
        }
        if (data.appreciationDocuments) {
          data.appreciationDocuments = environment.download + data.appreciationDocuments
        }
        if (data.subCategoryDoccument) {
          data.subCategoryDoccument = environment.download + data.subCategoryDoccument
        }
        if (data.financialDoccument) {
          data.financialDoccument = environment.download + data.financialDoccument
        }
        if (data.exhibit1) {
          data.exhibit1 = environment.download + data.exhibit1
        }
        if (data.exhibit2) {
          data.exhibit2 = environment.download + data.exhibit2
        }
        data.createAt=formatDate(data.createAt , 'MMM d, y, h:mm:ss a', 'en-US');
        data.updatedAt=formatDate(data.updatedAt , 'MMM d, y, h:mm:ss a', 'en-US');
        data.approveDate? data.approveDate=formatDate(data.approveDate , 'MMM d, y, h:mm:ss a', 'en-US'):'';
        data.remarkDate? data.remarkDate=formatDate(data.remarkDate , 'MMM d, y, h:mm:ss a', 'en-US'):'';
        this.memberData = data
        if(data.paymentStatus){
        this.httpService.ViewPayment(data.paymentId).subscribe((paymentdata:any)=>{
          paymentdata.createAt  = formatDate(paymentdata.createAt , 'MMM d, y, h:mm:ss a', 'en-US');
           this.paymentDetails=paymentdata
            
          })}
          if(data.offlinePaymentDetails)
          this.httpService.getOflinePayment(data.offlinePaymentDetails).subscribe((data:any)=>{
            data.createAt  = formatDate(data.createAt , 'MMM d, y, h:mm:ss a', 'en-US');
         this.OfflinepaymentDetails=data
          })


      },err=>{

        this.toast.error(err);
        this.localStorage.clearLocalStorage()

      })
    
  }

  ngOnInit(): void {
  }


  goBack(){
    this.location?.back();
  }

  
}
