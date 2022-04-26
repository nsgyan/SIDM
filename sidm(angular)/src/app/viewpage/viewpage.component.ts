import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/services/http.service';
import { environment } from "../../environments/environment.prod";
import { formatDate, Location } from '@angular/common'

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit {
  paymentDetails:any
  cat1 = true
  cat2 = true
  cat3 = true
  cat4 = true
  memberData: any;
  constructor(private route: ActivatedRoute,
    private httpService: HttpService,
    private location: Location) {
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

        this.memberData = data
        if(data.paymentStatus){
        this.httpService.ViewPayment(data.paymentId).subscribe((paymentdata:any)=>{
          paymentdata.createAt  = formatDate(paymentdata.createAt , 'MMM d, y, h:mm:ss a', 'en-US');
           this.paymentDetails=paymentdata
            
          })}

      })
    
      
      // this.httpService.ViewPayment(this.memberData?.paymentId).subscribe(data=>{
      //   console.log(data);
        
      // })
  }

  ngOnInit(): void {
  }

  goBack(){
    this.location?.back();

  }
}
