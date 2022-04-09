import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation, CrossEmailValidation, CrossPanValidation, panValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  appreciationDocuments: any;
  sidmMember = false
  otherMember = false
  vendorOrganization: boolean = false;
  isappreciation: boolean = false;
  scanDocument: any;
  documentsOfProduct: any;
  documentGstCertificate: any;
  userId: any
  EditForm = true
  newCategory = false
  newCategoryForm!: FormGroup;
  editForm!: FormGroup;
  cat1 = true
  cat2 = true
  cat3 = true
  cat4 = true
  memberData: any
  submitted: boolean = true;
  captcha: any;
  states: any;
  editData: any;
  catagery: any;
  email: any;
  mobilenumber: any;
  pan: any;
  constructor(private localStroage: LocalStorageService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private httpService: HttpService,
    private routes: Router,
  ) {
    this.getState()
    this.httpService.getMemberData('membertoken').
      subscribe((data: any) => {
        data.map((item: any) => {
          if (item.category === 'cat1') {
            this.cat1 = false
            item.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
          }
          else if (item.category === 'cat2') {
            this.cat2 = false
            item.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
          }
          else if (item.category === 'cat3') {
            this.cat3 = false
            item.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
          }
          else if (item.category === 'cat4') {
            this.cat4 = false
            item.category = 'C4- Export Performance of Defence & Aerospace Products'
          }
        })
        this.memberData = data;
        let email, pan, mobilenumber;


        for (let i of this.memberData) {
          this.email = i.email
          this.mobilenumber = i.mobileNumber;
          this.pan = i.panNumberOfOrganization.toUpperCase();
        }
        console.log(email, pan, mobilenumber);
        console.log('hello');


        // this.newCategoryForm = this.formBuilder.group({
        //   category: ['', Validators.required],
        //   typeOfApplicant: [''],
        //   nameOfOrganisation: [''],
        //   addressl1: [''],
        //   addressl2: [''],
        //   state: [''],
        //   city: [''],
        //   pincode: ['', [Validators.pattern('^[1-9][0-9]{5}$')]],
        //   name: [''],
        //   designation: [''],
        //   mobileNumber: [mobilenumber],
        //   email: [email],
        //   sidmMemberShipNumber: [''],
        //   otherAssociationMemberShipNumber: [''],
        //   panNumberOfOrganization: [pan],
        //   gstinOfOrganization: ['', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
        //   dateOfOrganization: [''],
        //   vendorOrganization1: [''],
        //   vendorOrganization2: [''],
        //   vendorOrganization3: [''],
        //   vendorOrganization4: [''],
        //   aboutCompany: [''],
        //   achievementsToJustifyApplication: [''],
        //   campareAchivement: [''],
        //   documentGstCertificate: [''],
        //   documentsOfProduct: [''],
        //   appreciationDocuments: [''],
        //   briefCompany: [''],
        //   awardMatterToCompany: ['']

        // })
      }, err => {
        console.log(err.error);
        this.toast.error(err.error);

      })
  }

  ngOnInit(): void {



  }




  onSubmit() {
    if (this.newCategoryForm.valid) {

    }
    else {
      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }

  }
  getState() {
    this.httpService.getStateList()
      .subscribe(data => {
        console.log(data);
        this.states = data

      })
  }


  applyNew() {
    this.newCategory = !this.newCategory

  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }





  changeListener($event: any, form: any) {
    let file = $event.target.files;
    console.log(file);

    if (parseInt(file[0].size) > 5242880) {
      this.editData.get(form)?.reset()
      this.editData.get(form)?.updateValueAndValidity()
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
      this.readThis($event.target, form);
    }
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


  viewForm(item: any) {
    console.log(item);

    if (item.status === "Draft") {
      this.EditForm = !this.EditForm

      this.httpService.getdetails(item._id).subscribe((data: any) => {
        if (data.category === 'cat1') {
          data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
        }
        else if (data.category === 'cat2') {
          data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
        }
        else if (data.category === 'cat3') {
          data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
        }
        else if (data.category === 'cat4') {
          data.category = 'C4- Export Performance of Defence & Aerospace Products'
        }
        data.sidmMember === 'Yes' ? this.sidmMember = true : ''
        data.otherMember === 'Yes' ? this.otherMember = true : ''
        data.vendorOrganization === 'Yes' ? this.vendorOrganization = true : ''
        data.isappreciation === 'Yes' ? this.isappreciation = true : ''

        // if (data.sidmMember === 'Yes' ) {
        //   this.sidmMember = true
        // }
        // if (data.otherMember === 'Yes') {
        //   this.sidmMember = true
        // }
        // if (data.vendorOrganization === 'Yes') {
        //   this.otherMember = true
        // }



        // if (data.isappreciation === 'Yes') {
        //   this.isappreciation = true
        // }

        console.log(data);
        this.editData = data
        this.catagery = this.editData.catagery
        this.editData.panNumberOfOrganization = this.editData.panNumberOfOrganization.toUpperCase();
        this.editForm = this.formBuilder.group({
          typeOfApplicant: [this.editData.typeOfApplicant ? this.editData.typeOfApplicant : ''],
          nameOfOrganisation: [this.editData.nameOfOrganisation ? this.editData.nameOfOrganisation : ''],
          addressl1: [this.editData.addressl1 ? this.editData.addressl1 : ''],
          addressl2: [this.editData.addressl2 ? this.editData.addressl2 : ''],
          state: [this.editData.state ? this.editData.state : ''],
          city: [this.editData.city ? this.editData.city : ''],
          pincode: [this.editData.pincode ? this.editData.pincode : '', [Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)]],
          name: [this.editData.name ? this.editData.name : ''],
          designation: [this.editData.designation ? this.editData.designation : ''],
          mobileNumber: [this.editData.mobileNumber ? this.editData.mobileNumber : ''],
          email: [this.editData.email ? this.editData.email : ''],

          sidmMemberShipNumber: [this.editData.sidmMemberShipNumber ? this.editData.sidmMemberShipNumber : ''],
          otherAssociationMemberShipNumber: [this.editData.otherAssociationMemberShipNumber ? this.editData.otherAssociationMemberShipNumber : ''],
          panNumberOfOrganization: [this.editData.panNumberOfOrganization ? this.editData.panNumberOfOrganization : ''],
          gstinOfOrganization: [this.editData.gstinOfOrganization ? this.editData.gstinOfOrganization : '', Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')],
          dateOfOrganization: [this.editData.dateOfOrganization ? this.editData.dateOfOrganization : ''],
          vendorOrganization1: [this.editData.vendorOrganization1 ? this.editData.vendorOrganization1 : ''],
          vendorOrganization2: [this.editData.vendorOrganization2 ? this.editData.vendorOrganization2 : ''],
          vendorOrganization3: [this.editData.vendorOrganization3 ? this.editData.vendorOrganization3 : ''],
          vendorOrganization4: [this.editData.vendorOrganization4 ? this.editData.vendorOrganization4 : ''],
          aboutCompany: [this.editData.aboutCompany ? this.editData.aboutCompany : ''],
          achievementsToJustifyApplication: [this.editData.achievementsToJustifyApplication ? this.editData.achievementsToJustifyApplication : ''],
          campareAchivement: [this.editData.campareAchivement ? this.editData.campareAchivement : ''],
          documentGstCertificate: [''],
          documentsOfProduct: [''],
          appreciationDocuments: [''],
          briefCompany: [this.editData.briefCompany ? this.editData.briefCompany : ''],
          awardMatterToCompany: [this.editData.awardMatterToCompany ? this.editData.awardMatterToCompany : ''],
          sidmMember: [this.editData.sidmMember ? this.editData.sidmMember : ''],
          otherMember: [this.editData.otherMember ? this.editData.otherMember : ''],
          vendorOrganization: [this.editData.vendorOrganization ? this.editData.vendorOrganization : ''],
          isappreciation: [this.editData.isappreciation ? this.editData.isappreciation : ''],

        })


      })
    }
    else {

      let url: string = "/detail/" + item._id
      this.routes.navigateByUrl(url);
    }

  }


  finalSubmit(type: string) {
    console.log('hello');
    this.editForm.get('typeOfApplicant')?.setValidators(Validators.required)
    this.editForm.get('typeOfApplicant')?.updateValueAndValidity()
    this.editForm.get('nameOfOrganisation')?.setValidators(Validators.required)
    this.editForm.get('nameOfOrganisation')?.updateValueAndValidity()
    this.editForm.get('addressl1')?.setValidators(Validators.required)
    this.editForm.get('addressl1')?.updateValueAndValidity()
    this.editForm.get('state')?.setValidators(Validators.required)
    this.editForm.get('state')?.updateValueAndValidity()
    this.editForm.get('city')?.setValidators(Validators.required)
    this.editForm.get('city')?.updateValueAndValidity()
    this.editForm.get('pincode')?.setValidators(Validators.required)
    this.editForm.get('pincode')?.updateValueAndValidity()
    this.editForm.get('name')?.setValidators(Validators.required)
    this.editForm.get('name')?.updateValueAndValidity()
    // this.editForm.get('typeOfApplicant')?.setValidators(Validators.required)
    // this.editForm.get('typeOfApplicant')?.updateValueAndValidity()
    // this.editForm.get('gstinOfOrganization')?.setValidators(Validators.required)
    // this.editForm.get('gstinOfOrganization')?.updateValueAndValidity()
    // this.editForm.get('nameOfOrganisation')?.setValidators(Validators.required)
    // this.editForm.get('nameOfOrganisation')?.updateValueAndValidity()
    // this.editForm.get('addressl1')?.setValidators(Validators.required)
    // this.editForm.get('addressl1')?.updateValueAndValidity()
    // this.editForm.get('state')?.setValidators(Validators.required)
    // this.editForm.get('state')?.updateValueAndValidity()
    // this.editForm.get('city')?.setValidators(Validators.required)
    // this.editForm.get('city')?.updateValueAndValidity()
    // this.editForm.get('pincode')?.setValidators(Validators.required)
    // this.editForm.get('pincode')?.updateValueAndValidity()
    // this.editForm.get('name')?.setValidators(Validators.required)
    // this.editForm.get('name')?.updateValueAndValidity()
    if (this.editForm.valid && this.captcha) {
      this.httpService.updateform(this.editData._id, {
        category: this.editForm.value.category,
        typeOfApplicant: this.editForm.value.typeOfApplicant,
        nameOfOrganisation: this.editForm.value.nameOfOrganisation,
        addressl1: this.editForm.value.addressl1,
        addressl2: this.editForm.value.addressl2,
        state: this.editForm.value.state,
        city: this.editForm.value.city,
        pincode: this.editForm.value.pincode,
        name: this.editForm.value.name,
        designation: this.editForm.value.designation,
        mobileNumber: this.editForm.value.mobileNumber,
        email: this.editForm.value.email,
        sidmMemberShipNumber: this.editForm.value.sidmMemberShipNumber,
        otherAssociationMemberShipNumber: this.editForm.value.otherAssociationMemberShipNumber,
        panNumberOfOrganization: this.editForm.value.panNumberOfOrganization,
        gstinOfOrganization: this.editForm.value.gstinOfOrganization,
        dateOfOrganization: this.editForm.value.dateOfOrganization,
        vendorOrganization1: this.editForm.value.vendorOrganization1,
        vendorOrganization2: this.editForm.value.vendorOrganization2,
        vendorOrganization3: this.editForm.value.vendorOrganization3,
        vendorOrganization4: this.editForm.value.vendorOrganization4,
        aboutCompany: this.editForm.value.vendorOrganization3,
        achievementsToJustifyApplication: this.editForm.value.achievementsToJustifyApplication,
        campareAchivement: this.editForm.value.campareAchivement,
        documentGstCertificate: this.documentGstCertificate,
        documentsOfProduct: this.documentsOfProduct,
        appreciationDocuments: this.appreciationDocuments,
        briefCompany: this.editForm.value.briefCompany,
        awardMatterToCompany: this.editForm.value.awardMatterToCompany,
        status: type,
        sidmMember: this.editForm.value.sidmMember,
        otherMember: this.editForm.value.otherMember,
        vendorOrganization: this.editForm.value.vendorOrganization,
        isappreciation: this.editForm.value.isappreciation,

      }).subscribe(data => {

        this.routes.navigate(['/thankYou'])
        this.toast.success('successfully applied');
      }, err => {
        console.log(err);
        this.toast.error(err);

      })
    }
    else if (!this.captcha) {
      this.toast.error('Please verify that you are not a robot.');
    }
    else {

      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }

  }

  savedraft(type: String) {
    this.editForm.get('typeOfApplicant')?.clearValidators()
    this.editForm.get('typeOfApplicant')?.updateValueAndValidity()
    this.editForm.get('nameOfOrganisation')?.clearValidators()
    this.editForm.get('nameOfOrganisation')?.updateValueAndValidity()
    this.editForm.get('addressl1')?.clearValidators()
    this.editForm.get('addressl1')?.updateValueAndValidity()
    this.editForm.get('state')?.clearValidators()
    this.editForm.get('state')?.updateValueAndValidity()
    this.editForm.get('city')?.clearValidators()
    this.editForm.get('city')?.updateValueAndValidity()
    this.editForm.get('pincode')?.clearValidators()
    this.editForm.get('pincode')?.setValidators([Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)])
    this.editForm.get('pincode')?.updateValueAndValidity()
    this.editForm.get('name')?.clearValidators()
    this.editForm.get('name')?.updateValueAndValidity()
    console.log(this.editForm.value.designation);

    if (this.editForm.valid && this.captcha) {
      this.httpService.updateform(this.editData._id, {
        category: this.editForm.value.category,
        typeOfApplicant: this.editForm.value.typeOfApplicant,
        nameOfOrganisation: this.editForm.value.nameOfOrganisation,
        addressl1: this.editForm.value.addressl1,
        addressl2: this.editForm.value.addressl2,
        state: this.editForm.value.state,
        city: this.editForm.value.city,
        pincode: this.editForm.value.pincode,
        name: this.editForm.value.name,
        designation: this.editForm.value.designation,
        mobileNumber: this.editForm.value.mobileNumber,
        email: this.editForm.value.email,
        sidmMemberShipNumber: this.editForm.value.sidmMemberShipNumber,
        otherAssociationMemberShipNumber: this.editForm.value.otherAssociationMemberShipNumber,
        panNumberOfOrganization: this.editForm.value.panNumberOfOrganization,
        gstinOfOrganization: this.editForm.value.gstinOfOrganization,
        dateOfOrganization: this.editForm.value.dateOfOrganization,
        vendorOrganization1: this.editForm.value.vendorOrganization1,
        vendorOrganization2: this.editForm.value.vendorOrganization2,
        vendorOrganization3: this.editForm.value.vendorOrganization3,
        vendorOrganization4: this.editForm.value.vendorOrganization4,
        aboutCompany: this.editForm.value.vendorOrganization3,
        achievementsToJustifyApplication: this.editForm.value.achievementsToJustifyApplication,
        campareAchivement: this.editForm.value.campareAchivement,
        documentGstCertificate: this.documentGstCertificate,
        documentsOfProduct: this.documentsOfProduct,
        appreciationDocuments: this.appreciationDocuments,
        briefCompany: this.editForm.value.briefCompany,
        awardMatterToCompany: this.editForm.value.awardMatterToCompany,
        status: type,
        sidmMember: this.editForm.value.sidmMember,
        otherMember: this.editForm.value.otherMember,
        vendorOrganization: this.editForm.value.vendorOrganization,
        isappreciation: this.editForm.value.isappreciation,

      }).subscribe(data => {
        this.editForm.reset();
        this.routes.navigate(['/thankYou'])
        this.toast.success('successfully applied');
      },
        error => {
          this.toast.error('Email or Mobile or Pan  already exists');
        }
      )
    }
    else if (!this.captcha) {
      this.toast.error('Please verify that you are not a robot.');
    }
    else {

      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }

  }

  changetoggel(conttrolName: String, value: string) {
    if (conttrolName === 'sidmMember' && value == 'Yes') {
      this.editForm.get('sidmMemberShipNumber')?.setValidators(Validators.required)
      this.editForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
      this.sidmMember = true
    }
    else if (conttrolName === 'sidmMember' && value == 'No') {
      this.sidmMember = false
      this.editForm.get('sidmMemberShipNumber')?.reset()
      this.editForm.get('sidmMsidmMemberShipNumberember')?.clearValidators()
      this.editForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
    }

    if (conttrolName === 'otherMember' && value == 'Yes') {
      this.otherMember = true
      this.editForm.get('otherAssociationMemberShipNumber')?.setValidators(Validators.required)

      this.editForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()
    }
    else if (conttrolName === 'otherMember' && value == 'No') {
      this.otherMember = false
      this.editForm.get('otherAssociationMemberShipNumber')?.reset()

      this.editForm.get('otherAssociationMemberShipNumber')?.clearValidators()
      this.editForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()

    }

    if (conttrolName === 'vendorOrganization' && value == 'Yes') {
      this.vendorOrganization = true
      this.editForm.get('vendorOrganization1')?.setValidators(Validators.required)

      this.editForm.get('vendorOrganization1')?.updateValueAndValidity()


    }
    else if (conttrolName === 'vendorOrganization' && value == 'No') {
      this.vendorOrganization = false
      this.editForm.get('vendorOrganization1')?.reset()
      this.editForm.get('vendorOrganization3')?.reset()
      this.editForm.get('vendorOrganization4')?.reset()
      this.editForm.get('vendorOrganization2')?.reset()

      this.editForm.get('vendorOrganization1')?.clearValidators()
      this.editForm.get('vendorOrganization1')?.updateValueAndValidity()

    }
    if (conttrolName === 'isappreciation' && value == 'Yes') {
      this.isappreciation = true
    }
    else if (conttrolName === 'isappreciation' && value == 'No') {
      this.isappreciation = false
      this.editForm.get('appreciationDocuments')?.reset()
      this.appreciationDocuments = null

    }
  }

  report() {
    this.editForm.get('appreciationDocuments')?.reset()

    this.editForm.get('appreciationDocuments')?.updateValueAndValidity()
  }

}
