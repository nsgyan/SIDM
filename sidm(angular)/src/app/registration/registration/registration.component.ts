import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation, panValidation, CrossPanValidation, CrossEmailValidation, GstValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  sidmMember = false
  otherMember = false
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
  submited: boolean = false;
  captcha: any;
  vendorOrganization: boolean = false;
  isappreciation: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private toast: ToastrService,
    private router: Router,
    private httpService: HttpService) {
    this.getState()
    this.registrationForm = this.formBuilder.group({
      category: ['', Validators.required],
      typeOfApplicant: [''],
      nameOfOrganisation: [''],
      addressl1: [''],
      addressl2: [''],
      state: [''],
      city: [''],
      pincode: ['', [Validators.pattern('^[1-9][0-9]{5}$'),Validators.minLength(6),Validators.maxLength(6)]],
      name: [''],
      designation: [''],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), CellNumValidation]],
      confirmMobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required],
      sidmMemberShipNumber: [''],
      otherAssociationMemberShipNumber: [''],
      panNumberOfOrganization: ['', [Validators.required, panValidation]],
      confirmPanNumberOfOrganization: ['', [Validators.required]],
      gstinOfOrganization: ['', Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)],
      dateOfOrganization: [''],
      vendorOrganization1: [''],
      vendorOrganization2: [''],
      vendorOrganization3: [''],
      vendorOrganization4: [''],
      aboutCompany: [''],
      achievementsToJustifyApplication: [''],
      campareAchivement: [''],
      documentGstCertificate: [''],
      documentsOfProduct: [''],
      appreciationDocuments: [''],
      briefCompany: [''],
      awardMatterToCompany: [''],
      sidmMember: [''],
      otherMember: [''],
      vendorOrganization: [''],
      isappreciation: [''],

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

  gstchangeListener($event: any, form: any) {
    let file = $event.target.files;

    if (
      file[0].type == 'application/pdf'

    ) {

      if (parseInt(file[0].size) > 524280) {
        this.registrationForm.get(form)?.reset()
        this.registrationForm.get(form)?.updateValueAndValidity()
        this.toast.error('file to large')
      }
      else {

        this.httpService.upload(file[0]).subscribe((data: any) => {


          this.documentGstCertificate = data.body;
          console.log(this.documentGstCertificate);



        })

      }
    }
    else {
      this.toast.error('File uploaded is invalid!')
      this.registrationForm.get(form)?.reset()
      this.registrationForm.get(form)?.updateValueAndValidity()

    }
  }


  changeListener($event: any, form: any) {
    let file = $event.target.files;
    console.log(file);


    if (
      file[0].type == 'image/png' ||
      file[0].type == 'image/jpg' ||
      file[0].type == 'image/jpeg' ||
      file[0].type == 'application/pdf' ||
      file[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      || file[0].type == 'application/msword'
    ) {
      console.log('jhe');

      if (parseInt(file[0].size) > 524280) {
      this.registrationForm.get(form)?.reset()
      this.registrationForm.get(form)?.updateValueAndValidity()
      this.toast.error('file to large')
    }
    else {
      const date = 'Wed Feb 20 2019 00:00:00 GMT-0400 (Atlantic Standard Time)';
      const time = '7:00 AM';

      console.log(file[0], 'fghj');

      this.httpService.upload(file[0]).subscribe((data: any) => {
        if (form === 'documentGstCertificate') {

          this.documentGstCertificate = data.body;
          console.log(this.documentGstCertificate);

        }
        else if (form === 'documentsOfProduct') {
          this.documentsOfProduct = data.body;
        }
        else if (form === 'appreciationDocuments') {
          this.appreciationDocuments = data.body;

        }
      })

      }
    }
    else {
      this.toast.error('File uploaded is invalid!')
      this.registrationForm.get(form)?.reset()
      this.registrationForm.get(form)?.updateValueAndValidity()

    }
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

    this.registrationForm.get('typeOfApplicant')?.clearValidators()
    this.registrationForm.get('typeOfApplicant')?.updateValueAndValidity()
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
    this.registrationForm.get('pincode')?.setValidators([Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)])
    this.registrationForm.get('pincode')?.updateValueAndValidity()
    this.registrationForm.get('name')?.clearValidators()
    this.registrationForm.get('name')?.updateValueAndValidity()
    this.registrationForm.get('sidmMember')?.clearValidators()
    this.registrationForm.get('sidmMember')?.updateValueAndValidity()
    this.registrationForm.get('otherMember')?.clearValidators()
    this.registrationForm.get('otherMember')?.updateValueAndValidity()
    this.registrationForm.get('vendorOrganization')?.clearValidators()
    this.registrationForm.get('vendorOrganization')?.updateValueAndValidity()
    this.registrationForm.get('isappreciation')?.clearValidators()
    this.registrationForm.get('isappreciation')?.updateValueAndValidity()
    if (this.registrationForm.valid && this.captcha) {
      let currentDate = new Date();
      this.httpService.postregistrationForm({
        createAt: currentDate,
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
        vendorOrganization1: this.registrationForm.value.vendorOrganization1,
        vendorOrganization2: this.registrationForm.value.vendorOrganization2,
        vendorOrganization3: this.registrationForm.value.vendorOrganization3,
        vendorOrganization4: this.registrationForm.value.vendorOrganization4,
        aboutCompany: this.registrationForm.value.vendorOrganization3,
        achievementsToJustifyApplication: this.registrationForm.value.achievementsToJustifyApplication,
        campareAchivement: this.registrationForm.value.campareAchivement,
        documentGstCertificate: this.documentGstCertificate,
        documentsOfProduct: this.documentsOfProduct,
        appreciationDocuments: this.appreciationDocuments,
        briefCompany: this.registrationForm.value.briefCompany,
        awardMatterToCompany: this.registrationForm.value.awardMatterToCompany,
        status: type,
        sidmMember: this.registrationForm.value.sidmMember,
        otherMember: this.registrationForm.value.otherMember,
        vendorOrganization: this.registrationForm.value.vendorOrganization,
        isappreciation: this.registrationForm.value.isappreciation,


      }).subscribe(data => {
        this.registrationForm.reset();
        this.toast.success(' Successfully Applied');
        this.router.navigate(['/thankYou'])
        // this.toastr.success('successfully applied');
      },
        error => {
          this.toast.error('Email or Mobile or Pan  already exists');
        }
      )
    }
    else if (!this.captcha) {
      this.submited = true;
      this.toast.error('Please verify that you are not a robot.');
    }
    else {

      this.submited = true;
      this.toast.error('Form invalid');
    }

  }
  checkemail(event: any) {
    this.registrationForm.get('confirmEmail')?.reset()
    const email = event.target.value ? event.target.value.toLowerCase() : this.registrationForm.get('email')?.value
    if (email) {
      console.log(email);
      this.httpService.checkEmail({ email: email })
        .subscribe((data: any) => {
          if (email === data.email) {
            this.registrationForm.get('email')?.setErrors({ isExist: true });
          }

        })

    }
  }
  checkMobile(event: any) {
    this.registrationForm.get('confirmMobileNumber')?.reset()
    const mobileNumber = event.target.value ? event.target.value : this.registrationForm.get('mobileNumber')?.value
    if (mobileNumber) {
      console.log(mobileNumber);
      this.httpService.checkMobile({ mobileNumber: mobileNumber })
        .subscribe((data: any) => {
          console.log(data);

          if (mobileNumber === data.mobileNumber) {
            this.registrationForm.get('mobileNumber')?.setErrors({ isExist: true });
          }

        })

    }
  }
  checkPan(event: any) {
    this.registrationForm.get('confirmPanNumberOfOrganization')?.reset()
    const panNumberOfOrganization = event.target.value ? event.target.value.toLowerCase() : this.registrationForm.get('panNumberOfOrganization')?.value
    if (panNumberOfOrganization) {
      console.log(panNumberOfOrganization);
      this.httpService.checkPan({ panNumberOfOrganization: panNumberOfOrganization })
        .subscribe((data: any) => {
          if (panNumberOfOrganization === data.panNumberOfOrganization) {
            this.registrationForm.get('panNumberOfOrganization')?.setErrors({ isExist: true });
          }

        })

    }
  }

  confirmEmail(event: any,) {
    console.log(event.target.value);
    console.log(this.registrationForm.value.email);
    if (event.target.value.toLowerCase() !== this.registrationForm.value.email.toLowerCase()) {
      console.log(event.target.value);
      console.log(this.registrationForm.value.email);
      this.registrationForm.get('confirmEmail')?.setErrors({ confirmEmail: true })
    }
    else {
      const email = event.target.value ? event.target.value.toLowerCase() : this.registrationForm.get('email')?.value
      if (email) {
        console.log(email);
        this.httpService.checkEmail({ email: email })
          .subscribe((data: any) => {
            if (email === data.email) {
              this.registrationForm.get('email')?.setErrors({ isExist: true });
            }

          })

      }

    }
  }

  confirmmobile(event: any,) {
    console.log(event.target.value);
    console.log(this.registrationForm.value.mobileNumber);
    if (event.target.value !== this.registrationForm.value.mobileNumber) {
      console.log(event.target.value);
      console.log(this.registrationForm.value.mobileNumber);
      this.registrationForm.get('confirmMobileNumber')?.setErrors({ confirmMobileNumber: true })
    }
    else {
      const mobileNumber = event.target.value ? event.target.value : this.registrationForm.get('mobileNumber')?.value
      if (mobileNumber) {
        console.log(mobileNumber);
        this.httpService.checkMobile({ mobileNumber: mobileNumber })
          .subscribe((data: any) => {
            console.log(data);

            if (mobileNumber === data.mobileNumber) {
              this.registrationForm.get('mobileNumber')?.setErrors({ isExist: true });
            }

          })

      }
    }
  }

  confirmPan(event: any,) {
    console.log(event.target.value);
    console.log(this.registrationForm.value.panNumberOfOrganization);
    if (event.target.value.toUpperCase() !== this.registrationForm.value.panNumberOfOrganization.toUpperCase()) {
      console.log(event.target.value);
      console.log(this.registrationForm.value.panNumberOfOrganization);
      this.registrationForm.get('confirmPanNumberOfOrganization')?.setErrors({ confirmPanNumber: true })
    }
    else {
      const panNumberOfOrganization = event.target.value ? event.target.value.toLowerCase() : this.registrationForm.get('panNumberOfOrganization')?.value
      if (panNumberOfOrganization) {
        console.log(panNumberOfOrganization);
        this.httpService.checkPan({ panNumberOfOrganization: panNumberOfOrganization })
          .subscribe((data: any) => {
            if (panNumberOfOrganization === data.panNumberOfOrganization) {
              this.registrationForm.get('panNumberOfOrganization')?.setErrors({ isExist: true });
            }

          })

      }
    }
  }

  finalSubmit(type: string) {

    this.registrationForm.get('category')?.setValidators(Validators.required)
    this.registrationForm.get('category')?.updateValueAndValidity()
    this.registrationForm.get('typeOfApplicant')?.setValidators(Validators.required)
    this.registrationForm.get('typeOfApplicant')?.updateValueAndValidity()
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
    this.registrationForm.get('sidmMember')?.setValidators(Validators.required)
    this.registrationForm.get('sidmMember')?.updateValueAndValidity()
    this.registrationForm.get('otherMember')?.setValidators(Validators.required)
    this.registrationForm.get('otherMember')?.updateValueAndValidity()
    this.registrationForm.get('vendorOrganization')?.setValidators(Validators.required)
    this.registrationForm.get('vendorOrganization')?.updateValueAndValidity()
    this.registrationForm.get('isappreciation')?.setValidators(Validators.required)
    this.registrationForm.get('isappreciation')?.updateValueAndValidity()
    if (this.registrationForm.valid && this.captcha) {
      let currentDate = new Date();
      this.httpService.postregistrationForm({
        createAt: currentDate,
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
        vendorOrganization1: this.registrationForm.value.vendorOrganization1,
        vendorOrganization2: this.registrationForm.value.vendorOrganization2,
        vendorOrganization3: this.registrationForm.value.vendorOrganization3,
        vendorOrganization4: this.registrationForm.value.vendorOrganization4,
        aboutCompany: this.registrationForm.value.vendorOrganization3,
        achievementsToJustifyApplication: this.registrationForm.value.achievementsToJustifyApplication,
        campareAchivement: this.registrationForm.value.campareAchivement,
        documentGstCertificate: this.documentGstCertificate,
        documentsOfProduct: this.documentsOfProduct,
        appreciationDocuments: this.appreciationDocuments,
        briefCompany: this.registrationForm.value.briefCompany,
        awardMatterToCompany: this.registrationForm.value.awardMatterToCompany,
        status: type,
        sidmMember: this.registrationForm.value.sidmMember,
        otherMember: this.registrationForm.value.otherMember,
        vendorOrganization: this.registrationForm.value.vendorOrganization,
        isappreciation: this.registrationForm.value.isappreciation,

      }).subscribe(data => {
        this.registrationForm.reset();
        this.toast.success(' Successfully Applied');
        this.router.navigate(['/thankYou'])
        // this.toastr.success('successfully applied');
      }, err => {
        this.toast.error(err);

      })
    }
    else if (!this.captcha) {
      this.submited = true;
      this.toast.error('Please verify that you are not a robot.');
    }
    else {

      this.submited = true;
      this.toast.error('Form invalid');
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
  pickclender() {
    return false
  }

  registerdUser() {
    this.router.navigate(['/login/member'])
  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }

  report() {
    this.registrationForm.get('appreciationDocuments')?.reset()
    this.appreciationDocuments = null
  }

  changetoggel(conttrolName: String, value: string) {
    if (conttrolName === 'sidmMember' && value == 'Yes') {
      this.registrationForm.get('sidmMemberShipNumber')?.setValidators(Validators.required)
      this.registrationForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
      this.sidmMember = true
    }
    else if (conttrolName === 'sidmMember' && value == 'No') {
      this.sidmMember = false
      this.registrationForm.get('sidmMemberShipNumber')?.reset()
      this.registrationForm.get('sidmMemberShipNumber')?.clearValidators()
      this.registrationForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
    }

    if (conttrolName === 'otherMember' && value == 'Yes') {
      this.otherMember = true
      this.registrationForm.get('otherAssociationMemberShipNumber')?.setValidators(Validators.required)

      this.registrationForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()
    }
    else if (conttrolName === 'otherMember' && value == 'No') {
      this.otherMember = false
      this.registrationForm.get('otherAssociationMemberShipNumber')?.reset()

      this.registrationForm.get('otherAssociationMemberShipNumber')?.clearValidators()
      this.registrationForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()

    }

    if (conttrolName === 'vendorOrganization' && value == 'Yes') {
      this.vendorOrganization = true
      this.registrationForm.get('vendorOrganization1')?.setValidators(Validators.required)

      this.registrationForm.get('vendorOrganization1')?.updateValueAndValidity()

    }
    else if (conttrolName === 'vendorOrganization' && value == 'No') {
      this.vendorOrganization = false
      this.registrationForm.get('vendorOrganization1')?.reset()
      this.registrationForm.get('vendorOrganization3')?.reset()
      this.registrationForm.get('vendorOrganization4')?.reset()
      this.registrationForm.get('vendorOrganization2')?.reset()

      this.registrationForm.get('vendorOrganization1')?.clearValidators()
      this.registrationForm.get('vendorOrganization1')?.updateValueAndValidity()
    }
    if (conttrolName === 'isappreciation' && value == 'Yes') {

      this.isappreciation = true
      this.registrationForm.get('appreciationDocuments')?.setValidators(Validators.required)

      this.registrationForm.get('appreciationDocuments')?.updateValueAndValidity()
    }
    else if (conttrolName === 'isappreciation' && value == 'No') {
      this.isappreciation = false
      this.registrationForm.get('appreciationDocuments')?.reset()

      this.registrationForm.get('appreciationDocuments')?.clearValidators()

      this.registrationForm.get('appreciationDocuments')?.updateValueAndValidity()
      this.appreciationDocuments = null

    }
  }

}
