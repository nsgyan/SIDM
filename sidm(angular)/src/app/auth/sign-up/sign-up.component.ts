import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CellNumValidation } from 'src/app/shared/services/custom-validator.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup
  constructor(private formBuilder: FormBuilder) {
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
      documentsOfProduct: ['']

    })
  }
  ngOnInit(): void {

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
    console.log(this.registrationForm);

  }

}
