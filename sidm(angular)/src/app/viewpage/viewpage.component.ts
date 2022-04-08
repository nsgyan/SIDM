import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent implements OnInit {
  cat1 = true
  cat2 = true
  cat3 = true
  cat4 = true
  memberData: any;
  constructor(private route: ActivatedRoute,
    private httpService: HttpService) {
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
          data.documentGstCertificate = '/sidm(backend)/uploads/' + data.documentGstCertificate
        }
        else if (data.appreciationDocuments) {
          data.appreciationDocuments = '/sidm(backend)/uploads/' + data.appreciationDocuments
        }
        else if (data.documentsOfProduct) {
          data.documentsOfProduct = '/sidm(backend)/uploads/' + data.documentsOfProduct
        }
        this.memberData = data
        console.log(data);



      })
  }

  ngOnInit(): void {
  }

}
