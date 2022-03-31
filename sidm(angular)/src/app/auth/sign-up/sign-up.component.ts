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
  companyPhotograph: any;


  registrationForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService) {
    this.registrationForm = this.formBuilder.group({
      category: [''],
      typeOfApplicant: [''],
      nameOfOrganisation: [''],
      cin: [''],
      udhyogAadharNumber: [''],
      dippNumber: [''],
      adhaarNumber: [''],
      sidmMemberShipNumber: [''],
      otherAssociationMemberShipNumber: [''],
      organizationsAddress: [''],
      contactName: [''],
      designation: [''],
      mobileNumber: ['', [Validators.required]],
      email: [''],
      panNumber: [''],
      gstin: [''],
      dateOfCompany: [''],
      scanDocument: [''],
      userAwardedByOrganization: [''],
      aboutCompany: [''],
      achievementsToJustifyApplication: [''],
      appreciationDocuments: [''],
      campareAchivement: [''],
      documentsOfProduct: [''],
      companyPhotograph: [''],
      vendorOfDefenceOrganizationEntities1: [''],
      vendorOfDefenceOrganizationEntities2: [''],
      vendorOfDefenceOrganizationEntities3: [''],
      vendorOfDefenceOrganizationEntities4: [''],
      vendorOfDefenceOrganizationProduct1: [''],
      vendorOfDefenceOrganizationProduct2: [''],
      vendorOfDefenceOrganizationProduct3: [''],
      vendorOfDefenceOrganizationProduct4: ['']

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
      if (form === 'companyPhotograph') {
        this.companyPhotograph = myReader.result;
      }
      else if (form === 'documentsOfProduct') {
        this.documentsOfProduct = myReader.result;
      }
      else if (form === 'scanDocument') {
        this.scanDocument = myReader.result;
      }
      else if (form === 'appreciationDocuments') {
        this.appreciationDocuments = myReader.result;

      }
      console.log(this.companyPhotograph);
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
      "category": this.registrationForm.value.category,
      "typeOfApplicant": this.registrationForm.value.typeOfApplicant,
      'nameOfOrganisation': this.registrationForm.value.nameOfOrganisation,
      'cin': this.registrationForm.value.cin,
      'udhyogAadharNumber': this.registrationForm.value.udhyogAadharNumber,
      'dippNumber': this.registrationForm.value.dippNumber,
      'adhaarNumber': this.registrationForm.value.adhaarNumber,
      'sidmMemberShipNumber': this.registrationForm.value.sidmMemberShipNumber,
      'otherAssociationMemberShipNumber': this.registrationForm.value.otherAssociationMemberShipNumber,
      'organizationsAddress': this.registrationForm.value.organizationsAddress,
      'contactName': this.registrationForm.value.contactName,
      'designation': this.registrationForm.value.designation,
      'mobileNumber': this.registrationForm.value.mobileNumber,
      'email': this.registrationForm.value.email,
      'panNumber': this.registrationForm.value.panNumber,
      'gstin': this.registrationForm.value.gstin,
      'dateOfCompany': this.registrationForm.value.dateOfCompany,
      'scanDocumentUrl': this.scanDocument,
      'userAwardedByOrganization': this.registrationForm.value.userAwardedByOrganization,
      'aboutCompany': this.registrationForm.value.aboutCompany,
      'achievementsToJustifyApplication': this.registrationForm.value.achievementsToJustifyApplication,
      'appreciationDocumentsUrl': this.appreciationDocuments,
      'campareAchivement': this.registrationForm.value.campareAchivement,
      'documentsOfProductUrl': this.documentsOfProduct,
      'companyPhotograph': this.companyPhotograph,
      'vendorOfDefenceOrganizationEntities1': this.registrationForm.value.vendorOfDefenceOrganizationEntities1,
      'vendorOfDefenceOrganizationEntities2': this.registrationForm.value.vendorOfDefenceOrganizationEntities2,
      'vendorOfDefenceOrganizationEntities3': this.registrationForm.value.vendorOfDefenceOrganizationEntities3,
      'vendorOfDefenceOrganizationEntities4': this.registrationForm.value.vendorOfDefenceOrganizationEntities4,
      'vendorOfDefenceOrganizationProduct1': this.registrationForm.value.vendorOfDefenceOrganizationProduct1,
      'vendorOfDefenceOrganizationProduct2': this.registrationForm.value.vendorOfDefenceOrganizationProduct2,
      'vendorOfDefenceOrganizationProduct3': this.registrationForm.value.vendorOfDefenceOrganizationProduct3,
      'vendorOfDefenceOrganizationProduct4': this.registrationForm.value.vendorOfDefenceOrganizationProduct4


    }).subscribe(data => {
      console.log(data);

    })

  }

}
