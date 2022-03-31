import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  appreciationDocuments: any;
  scanDocument: any;
  documentsOfProduct: any;
  documentGstCertificate: any;


  registrationForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService) {
    this.registrationForm = this.formBuilder.group({
      category: [''],
      typeOfApplicant: [''],
      nameOfOrganisation: [''],
      addressl1: [''],
      addressl2: [''],
      state: [''],
      city: [''],
      pincode: [''],
      contactName: [''],
      designation: [''],
      mobileNumber: ['', [Validators.required]],
      email: [''],
      sidmMemberShipNumber: [''],
      otherAssociationMemberShipNumber: [''],
      panNumberOfOrganization: [''],
      gstinOfOrganization: [''],
      dateOfOrganization: [''],
      financialStatement1: [''],
      financialStatement2: [''],
      financialStatement3: [''],
      aboutCompany: [''],
      achievementsToJustifyApplication: [''],
      campareAchivement: [''],
      documentGstCertificate: [''],
      documentsOfProductL: [''],
      appreciationDocuments: [''],
      briefCompany: ['']

    })
  }
  ngOnInit(): void {

  }
  changeListener($event: any, form: any) {
    console.log($event);

    this.readThis($event.target, form);


  }

  readThis(inputValue: any, form: any): void {

    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      if (form === 'documentGstCertificate') {
        this.documentGstCertificate = myReader.result;
      }
      else if (form === 'documentsOfProduct') {
        this.documentsOfProduct = myReader.result;
      }
      else if (form === 'appreciationDocuments') {
        this.appreciationDocuments = myReader.result;

      }
      console.log(this.documentGstCertificate);
      console.log(this.documentsOfProduct);
      console.log(this.scanDocument);
      console.log(this.appreciationDocuments);
    }
    myReader.readAsDataURL(file);
  }

  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    this.httpService.postregistrationForm({
      category: this.registrationForm.value.category,
      typeOfApplicant: this.registrationForm.value.typeOfApplicant,
      nameOfOrganisation: this.registrationForm.value.nameOfOrganisation,
      addressl1: this.registrationForm.value.addressl1,
      addressl2: this.registrationForm.value.addressl2,
      state: this.registrationForm.value.state,
      city: this.registrationForm.value.city,
      pincode: this.registrationForm.value.pincode,
      contactName: this.registrationForm.value.contactName,
      designation: this.registrationForm.value.designation,
      mobileNumber: this.registrationForm.value.mobileNumber,
      email: this.registrationForm.value.email,
      sidmMemberShipNumber: this.registrationForm.value.sidmMemberShipNumber,
      otherAssociationMemberShipNumber: this.registrationForm.value.otherAssociationMemberShipNumber,
      panNumberOfOrganization: this.registrationForm.value.panNumberOfOrganization,
      gstinOfOrganization: this.registrationForm.value.gstinOfOrganization,
      dateOfOrganization: this.registrationForm.value.dateOfOrganization,
      financialStatement1: this.registrationForm.value.financialStatement1,
      financialStatement2: this.registrationForm.value.financialStatement2,
      financialStatement3: this.registrationForm.value.financialStatement2,
      aboutCompany: this.registrationForm.value.financialStatement3,
      achievementsToJustifyApplication: this.registrationForm.value.achievementsToJustifyApplication,
      campareAchivement: this.registrationForm.value.campareAchivement,
      documentGstCertificate: this.documentGstCertificate,
      documentsOfProduct: this.documentsOfProduct,
      appreciationDocuments: this.appreciationDocuments,
      briefCompany: this.registrationForm.value.briefCompany

    }).subscribe(data => {
      console.log(data);

    })

  }

}
