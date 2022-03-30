import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
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
      otherAssociationMembershipNumber: [''],
      organizationsAddress: [''],
      contactName: [''],
      designation: [''],
      mobileNumber: [''],
      email: [''],
      panNumber: [''],
      gstin: [''],
      dateOfCompany: [''],
      scanDocument: [''],
      awardByOtherOrganization: [''],
      aboutCompany: [''],
      achievements: [''],

    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.registrationForm);

  }

}
