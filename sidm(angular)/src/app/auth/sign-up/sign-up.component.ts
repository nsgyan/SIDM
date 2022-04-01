import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CellNumValidation, panValidation } from 'src/app/shared/services/custom-validator.service';
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

  memberform: FormGroup;
  registrationForm: FormGroup

  constructor(private formBuilder: FormBuilder,

    private httpService: HttpService) {
    this.registrationForm = this.formBuilder.group({
      category: ['', Validators.required],
      typeOfApplicant: ['', Validators.required],
      nameOfOrganisation: ['', Validators.required],
      addressl1: ['', Validators.required],
      addressl2: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      name: ['', Validators.required],
      designation: [''],
      mobileNumber: ['', [Validators.required, CellNumValidation]],
      email: ['', Validators.required],
      sidmMemberShipNumber: [''],
      otherAssociationMemberShipNumber: [''],
      panNumberOfOrganization: ['', [Validators.required, panValidation]],
      gstinOfOrganization: [''],
      dateOfOrganization: [''],
      financialStatement1: [''],
      financialStatement2: [''],
      financialStatement3: [''],
      aboutCompany: [''],
      achievementsToJustifyApplication: [''],
      campareAchivement: [''],
      documentGstCertificate: [''],
      documentsOfProduct: [''],
      appreciationDocuments: [''],
      briefCompany: [''],
      awardMatterToCompany: ['']

    })

    this.memberform = this.formBuilder.group({
      id: [''],
      email: [''],
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
  keyPresschar(evt: any) {
    evt = (evt) ? evt : event;
    const charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
      ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
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
      name: this.registrationForm.value.name,
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
      briefCompany: this.registrationForm.value.briefCompany,

    }).subscribe(data => {
      console.log(data);

      // this.toastr.success('successfully applied');
    })

  }
  memberlogin() {
    console.log(this.memberform);

    this.httpService.memberlogin(this.memberform.value.id).subscribe(data => {
      console.log(data);

    })
  }

}
