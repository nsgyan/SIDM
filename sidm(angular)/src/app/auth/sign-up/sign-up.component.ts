import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation, Confirmed, ConfirmedValidator, CrossEmailValidation, CrossMobileValidation, CrossPanValidation, fileSizeValidator, panValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

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
  states: any;
  panMatch: boolean = false;
  mobileMatch: Boolean = false
  emailMatch: Boolean = false

  memberform: FormGroup;
  registrationForm: FormGroup
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private toast: ToastrService,
    private router: Router,
    private httpService: HttpService) {
    this.getState()
    this.registrationForm = this.formBuilder.group({
      category: ['', Validators.required],
      typeOfApplicant: ['', Validators.required],
      nameOfOrganisation: [''],
      addressl1: [''],
      addressl2: [''],
      state: [''],
      city: [''],
      pincode: ['', [Validators.pattern('^[1-9][0-9]{5}$')]],
      name: [''],
      designation: [''],
      mobileNumber: ['', [Validators.required, CellNumValidation]],
      confirmMobileNumber: ['', [Validators.required, CellNumValidation,]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      sidmMemberShipNumber: [''],
      otherAssociationMemberShipNumber: [''],
      panNumberOfOrganization: ['', [Validators.required, panValidation]],
      confirmPanNumberOfOrganization: ['', [Validators.required, panValidation, CrossPanValidation]],
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

    },
    )

    this.memberform = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      panNumber: ['', Validators.required],
    })
  }
  ngOnInit(): void {
  }
  changeListener($event: any, form: any) {
    let file = $event.target.files;
    console.log($event.target.files);
    // this.readThis($event.target, form);
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
    }
    myReader.readAsDataURL(file);
  }
  getState() {
    this.httpService.getStateList()
      .subscribe(data => {
        console.log(data);
        this.states = data

      })
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
  savedraft(type: String) {
    this.registrationForm.get('gstinOfOrganization')?.clearValidators()
    this.registrationForm.get('gstinOfOrganization')?.updateValueAndValidity()
    this.registrationForm.get('nameOfOrganisation')?.clearValidators()
    this.registrationForm.get('nameOfOrganisation')?.updateValueAndValidity()
    this.registrationForm.get('addressl1')?.clearValidators()
    this.registrationForm.get('addressl1')?.updateValueAndValidity()
    this.registrationForm.get('state')?.clearValidators()
    this.registrationForm.get('state')?.updateValueAndValidity()
    this.registrationForm.get('city')?.clearValidators()
    this.registrationForm.get('city')?.updateValueAndValidity()
    this.registrationForm.get('pincode')?.clearValidators()
    this.registrationForm.get('pincode')?.updateValueAndValidity()
    this.registrationForm.get('name')?.clearValidators()
    this.registrationForm.get('name')?.updateValueAndValidity()
    if (this.registrationForm.valid) {
      if (this.registrationForm.value.email === this.registrationForm.value.confirmEmail && this.registrationForm.value.mobileNumber === this.registrationForm.value.confirmMobileNumber && this.registrationForm.value.panNumberOfOrganization === this.registrationForm.value.confirmPanNumberOfOrganization) {
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
          status: type

        }).subscribe(data => {
          this.registrationForm.reset();
          this.toast.success(' Successfully Applied');
          this.router.navigate(['/thankYou'])
          // this.toastr.success('successfully applied');
        },
          error => {
            this.toast.error(error);
          }
        )
      }
      else {
        if (this.registrationForm.value.mobileNumber !== this.registrationForm.value.confirmMobileNumber) {
          this.mobileMatch = true
          this.toast.error('Confirm Mobile number does not match');
        }
        if (this.registrationForm.value.email !== this.registrationForm.value.confirmEmail) {
          this.emailMatch = true
          this.toast.error('Confirm Email does not match');
        }
        if (this.registrationForm.value.panNumberOfOrganization !== this.registrationForm.value.confirmPanNumberOfOrganization) {
          this.panMatch = true
          this.toast.error('Pan number does not match');
        }
      }
    }
    else {
      console.log(this.registrationForm);

      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }

  }

  finalSubmit(type: string) {
    this.registrationForm.get('category')?.setValidators(Validators.required)
    this.registrationForm.get('category')?.updateValueAndValidity()
    this.registrationForm.get('typeOfApplicant')?.setValidators(Validators.required)
    this.registrationForm.get('typeOfApplicant')?.updateValueAndValidity()
    this.registrationForm.get('gstinOfOrganization')?.setValidators(Validators.required)
    this.registrationForm.get('gstinOfOrganization')?.updateValueAndValidity()
    this.registrationForm.get('nameOfOrganisation')?.setValidators(Validators.required)
    this.registrationForm.get('nameOfOrganisation')?.updateValueAndValidity()
    this.registrationForm.get('addressl1')?.setValidators(Validators.required)
    this.registrationForm.get('addressl1')?.updateValueAndValidity()
    this.registrationForm.get('state')?.setValidators(Validators.required)
    this.registrationForm.get('state')?.updateValueAndValidity()
    this.registrationForm.get('city')?.setValidators(Validators.required)
    this.registrationForm.get('city')?.updateValueAndValidity()
    this.registrationForm.get('pincode')?.setValidators(Validators.required)
    this.registrationForm.get('pincode')?.updateValueAndValidity()
    this.registrationForm.get('name')?.setValidators(Validators.required)
    this.registrationForm.get('name')?.updateValueAndValidity()
    if (this.registrationForm.valid) {
      if (this.registrationForm.value.email === this.registrationForm.value.confirmEmail && this.registrationForm.value.mobileNumber === this.registrationForm.value.confirmMobileNumber && this.registrationForm.value.panNumberOfOrganization === this.registrationForm.value.confirmPanNumberOfOrganization) {
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
          status: type

        }).subscribe(data => {
          this.registrationForm.reset();
          this.toast.success(' Successfully Applied');
          this.router.navigate(['/thankYou'])
          // this.toastr.success('successfully applied');
        }, err => {
          console.log(err);
          this.toast.error(err);

        })
      }
      else {
        if (this.registrationForm.value.mobileNumber !== this.registrationForm.value.confirmMobileNumber) {
          this.mobileMatch = true
          this.toast.error('Confirm Mobile number does not match');
        }
        if (this.registrationForm.value.email !== this.registrationForm.value.confirmEmail) {
          this.emailMatch = true
          this.toast.error('Confirm Email does not match');
        }
        if (this.registrationForm.value.panNumberOfOrganization !== this.registrationForm.value.confirmPanNumberOfOrganization) {
          this.panMatch = true
          this.toast.error('Pan number does not match');
        }
      }
    }
    else {
      console.log(this.registrationForm);

      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }

  }

  onSubmit(type: string) {
    if (type === 'submit') {
      this.finalSubmit(type)
    }
    else if (type === 'Draft') {
      this.savedraft(type)
    }

  }
  memberlogin() {
    console.log(this.memberform);
    if (this.memberform.valid) {
    this.httpService.memberlogin({ email: this.memberform.value.email, mobileNumber: this.memberform.value.mobileNumber, panNumber: this.memberform.value.panNumber }).subscribe((data: any) => {
      this.localStorage.set('memberUserID', data._id)
      this.router.navigate(['/memberDashboard'])
      this.toast.success('Member Successfully login!');
    }, err => {
      this.toast.error('Please Provide Valid Email Mobile Number And Pan Number');
    })
    }
    else {
      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }
  }
  reset() {
    this.memberform.reset()
    this.submitted = false
  }

}
