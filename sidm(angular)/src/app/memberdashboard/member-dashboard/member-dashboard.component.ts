import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation, CrossEmailValidation, CrossPanValidation, panValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment.prod';

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
  submited: boolean = true;
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
    this.httpService.getMemberData().
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


        for (let i of this.memberData) {
          this.email = i.email
          this.mobilenumber = i.mobileNumber;
          this.pan = i.panNumberOfOrganization.toUpperCase();
        }
        this.newCategoryForm = this.formBuilder.group({
          category: ['', Validators.required],
          typeOfApplicant: [''],
          nameOfOrganisation: [''],
          addressl1: [''],
          addressl2: [''],
          state: [''],
          city: [''],
          pincode: ['', [Validators.pattern('^[1-9][0-9]{5}$')]],
          name: [''],
          designation: [''],
          mobileNumber: [this.mobilenumber],
          email: [this.email],
          sidmMemberShipNumber: [''],
          otherAssociationMemberShipNumber: [''],
          panNumberOfOrganization: [this.pan],
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

        })
      }, err => {
        console.log(err.error);

        this.toast.error(err.error);
        this.routes.navigate(['login/member'])

      })
  }

  ngOnInit(): void {



  }




  onSubmit() {
    if (this.newCategoryForm.valid) {

    }
    else {
      this.submited = true;
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
    this.submited = false
    this.newCategory = !this.newCategory
    this.documentGstCertificate = '';
    this.documentsOfProduct = '';
    this.appreciationDocuments = ''
    this.otherMember = false;
    this.sidmMember = false
    this.submited = false
    this.isappreciation = false
    this.vendorOrganization = false


  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }






  gstchangeListener($event: any, form: any, type: string) {
    let file = $event.target.files;

    if (
      file[0].type == 'application/pdf'

    ) {

      if (parseInt(file[0].size) > 524280) {

        if (type === 'editForm') {
          this.editForm.get(form)?.reset()
          this.editForm.get(form)?.updateValueAndValidity()
          this.toast.error('file to large')
        }
        else if (type === 'newCategoryForm') {
          this.newCategoryForm.get(form)?.reset()
          this.newCategoryForm.get(form)?.updateValueAndValidity()
          this.toast.error('file to large');

        }
      }
      else {

        this.httpService.upload(file[0]).subscribe((data: any) => {


          this.documentGstCertificate = data.body;
          console.log(this.documentGstCertificate);



        })

      }
    }
    else {
      if (type === 'editForm') {
        this.editForm.get(form)?.reset()
        this.editForm.get(form)?.updateValueAndValidity()

        this.toast.error('File uploaded is invalid!')
      }
      else if (type === 'newCategoryForm') {
        this.newCategoryForm.get(form)?.reset()
        this.newCategoryForm.get(form)?.updateValueAndValidity()

        this.toast.error('File uploaded is invalid!')

      }
    }
  }

  pickclender() {
    return false
  }

  changeListener($event: any, form: any, type: string) {
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
        if (type === 'editForm') {
          this.editForm.get(form)?.reset()
          this.editForm.get(form)?.updateValueAndValidity()
      this.toast.error('file to large')
    }
        else if (type === 'newCategoryForm') {
          this.newCategoryForm.get(form)?.reset()
          this.newCategoryForm.get(form)?.updateValueAndValidity()
          this.toast.error('file to large');

        }
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
      if (type === 'editForm') {
        this.editForm.get(form)?.reset()
        this.editForm.get(form)?.updateValueAndValidity()

        this.toast.error('File uploaded is invalid!')
      }
      else if (type === 'newCategoryForm') {
        this.newCategoryForm.get(form)?.reset()
        this.newCategoryForm.get(form)?.updateValueAndValidity()

        this.toast.error('File uploaded is invalid!')

      }

    }
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
    this.otherMember = false;
    this.sidmMember = false
    this.submited = false
    this.newCategory = false
    this.isappreciation = false
    this.submited = false
    this.newCategory = false
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
        if (data.documentGstCertificate) {
          data.documentGstCertificate = environment.download + data.documentGstCertificate
          this.documentGstCertificate = data.documentGstCertificate
        }
        if (data.appreciationDocuments) {
          data.appreciationDocuments = environment.download + data.appreciationDocuments
          console.log(data.appreciationDocuments);
          this.appreciationDocuments = data.appreciationDocuments

        }
        if (data.documentsOfProduct) {
          data.documentsOfProduct = environment.download + data.documentsOfProduct
          this.documentsOfProduct = data.documentsOfProduct
        }

        data.sidmMember === 'Yes' ? this.sidmMember = true : ''
        data.otherMember === 'Yes' ? this.otherMember = true : ''
        data.vendorOrganization === 'Yes' ? this.vendorOrganization = true : ''
        data.isappreciation === 'Yes' ? this.isappreciation = true : ''

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
          gstinOfOrganization: [this.editData.gstinOfOrganization ? this.editData.gstinOfOrganization : '', Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)],
          dateOfOrganization: [this.editData.dateOfOrganization ? this.editData.dateOfOrganization : ''],
          vendorOrganization1: [this.editData.vendorOrganization1 ? this.editData.vendorOrganization1 : ''],
          vendorOrganization2: [this.editData.vendorOrganization2 ? this.editData.vendorOrganization2 : ''],
          vendorOrganization3: [this.editData.vendorOrganization3 ? this.editData.vendorOrganization3 : ''],
          vendorOrganization4: [this.editData.vendorOrganization4 ? this.editData.vendorOrganization4 : ''],
          aboutCompany: [this.editData.aboutCompany ? this.editData.aboutCompany : ''],
          achievementsToJustifyApplication: [this.editData.achievementsToJustifyApplication ? this.editData.achievementsToJustifyApplication : ''],
          campareAchivement: [this.editData.campareAchivement ? this.editData.campareAchivement : ''],
          documentGstCertificate: [this.editData.documentGstCertificate ? this.editData.documentGstCertificate : ''],
          documentsOfProduct: [this.editData.documentsOfProduct ? this.editData.documentsOfProduct : ''],
          appreciationDocuments: [this.editData.appreciationDocuments ? this.editData.appreciationDocuments : ''],
          briefCompany: [this.editData.briefCompany ? this.editData.briefCompany : ''],
          awardMatterToCompany: [this.editData.awardMatterToCompany ? this.editData.awardMatterToCompany : ''],
          sidmMember: [this.editData.sidmMember ? this.editData.sidmMember : ''],
          otherMember: [this.editData.otherMember ? this.editData.otherMember : ''],
          vendorOrganization: [this.editData.vendorOrganization ? this.editData.vendorOrganization : ''],
          isappreciation: [this.editData.isappreciation ? this.editData.isappreciation : ''],

        })
        if (this.editData.sidmMember === 'Yes') {
          this.editForm.get('sidmMemberShipNumber')?.setValidators(Validators.required)
          this.editForm.get('sidmMemberShipNumber')?.updateValueAndValidity()

        }
        if (this.editData.otherMember === 'Yes') {
          this.editForm.get('otherAssociationMemberShipNumber')?.setValidators(Validators.required)

          this.editForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()

        }
        if (this.editData.vendorOrganization === 'Yes') {
          this.editForm.get('vendorOrganization1')?.setValidators(Validators.required)

          this.editForm.get('vendorOrganization1')?.updateValueAndValidity()

        }


      })
    }
    else {

      let url: string = "/detail/" + item._id
      this.routes.navigateByUrl(url);
    }

  }
  changetoggel(conttrolName: String, value: string) {
    if (conttrolName === 'sidmMember' && value == 'Yes') {
      this.editForm.get('sidmMemberShipNumber')?.setValidators(Validators.required)
      this.editForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
      console.log('hello');

      this.sidmMember = true
    }
    else if (conttrolName === 'sidmMember' && value == 'No') {
      this.sidmMember = false
      this.editForm.get('sidmMemberShipNumber')?.reset()
      this.editForm.get('sidmMemberShipNumber')?.clearValidators()
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
      this.editForm.get('appreciationDocuments')?.setValidators(Validators.required)

      this.editForm.get('appreciationDocuments')?.updateValueAndValidity()
      this.isappreciation = true
    }
    else if (conttrolName === 'isappreciation' && value == 'No') {
      this.isappreciation = false
      this.editForm.get('appreciationDocuments')?.reset()
      this.editForm.get('appreciationDocuments')?.clearValidators()

      this.editForm.get('appreciationDocuments')?.updateValueAndValidity()
      this.appreciationDocuments = null

    }
  }



  finalSubmit(type: string) {
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
    this.editForm.get('sidmMember')?.setValidators(Validators.required)
    this.editForm.get('sidmMember')?.updateValueAndValidity()
    this.editForm.get('otherMember')?.setValidators(Validators.required)
    this.editForm.get('otherMember')?.updateValueAndValidity()
    this.editForm.get('vendorOrganization')?.setValidators(Validators.required)
    this.editForm.get('vendorOrganization')?.updateValueAndValidity()
    this.editForm.get('isappreciation')?.setValidators(Validators.required)
    this.editForm.get('isappreciation')?.updateValueAndValidity()

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
        aboutCompany: this.editForm.value.aboutCompany,
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
        this.toast.error(err.error);
        this.routes.navigate(['login/member'])


      })
    }
    else if (!this.captcha) {
      this.toast.error('Please verify that you are not a robot.');
    }
    else {

      this.submited = true;
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
    this.editForm.get('sidmMember')?.clearValidators()
    this.editForm.get('sidmMember')?.updateValueAndValidity()
    this.editForm.get('otherMember')?.clearValidators()
    this.editForm.get('otherMember')?.updateValueAndValidity()
    this.editForm.get('vendorOrganization')?.clearValidators()
    this.editForm.get('vendorOrganization')?.updateValueAndValidity()
    this.editForm.get('isappreciation')?.clearValidators()
    this.editForm.get('isappreciation')?.updateValueAndValidity()

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
        aboutCompany: this.editForm.value.aboutCompany,
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
          this.toast.error(error.error);
          this.routes.navigate(['login/member'])
        }
      )
    }
    else if (!this.captcha) {
      this.submited = true;
      this.toast.error('Please verify that you are not a robot.');
    }
    else {

      this.submited = true;
      this.toast.error('Please Fill Required Field');
    }

  }



  report() {
    this.editForm.get('appreciationDocuments')?.reset()

    this.editForm.get('appreciationDocuments')?.updateValueAndValidity()
  }



  newSubmit(type: string) {
    this.newCategoryForm.get('category')?.setValidators(Validators.required)
    this.newCategoryForm.get('category')?.updateValueAndValidity()
    this.newCategoryForm.get('typeOfApplicant')?.setValidators(Validators.required)
    this.newCategoryForm.get('typeOfApplicant')?.updateValueAndValidity()
    this.newCategoryForm.get('nameOfOrganisation')?.setValidators(Validators.required)
    this.newCategoryForm.get('nameOfOrganisation')?.updateValueAndValidity()
    this.newCategoryForm.get('addressl1')?.setValidators(Validators.required)
    this.newCategoryForm.get('addressl1')?.updateValueAndValidity()
    this.newCategoryForm.get('state')?.setValidators(Validators.required)
    this.newCategoryForm.get('state')?.updateValueAndValidity()
    this.newCategoryForm.get('city')?.setValidators(Validators.required)
    this.newCategoryForm.get('city')?.updateValueAndValidity()
    this.newCategoryForm.get('pincode')?.setValidators(Validators.required)
    this.newCategoryForm.get('pincode')?.updateValueAndValidity()
    this.newCategoryForm.get('name')?.setValidators(Validators.required)
    this.newCategoryForm.get('name')?.updateValueAndValidity()
    this.newCategoryForm.get('sidmMember')?.setValidators(Validators.required)
    this.newCategoryForm.get('sidmMember')?.updateValueAndValidity()
    this.newCategoryForm.get('otherMember')?.setValidators(Validators.required)
    this.newCategoryForm.get('otherMember')?.updateValueAndValidity()
    this.newCategoryForm.get('vendorOrganization')?.setValidators(Validators.required)
    this.newCategoryForm.get('vendorOrganization')?.updateValueAndValidity()
    this.newCategoryForm.get('isappreciation')?.setValidators(Validators.required)
    this.newCategoryForm.get('isappreciation')?.updateValueAndValidity()
    if (this.newCategoryForm.valid && this.captcha) {
      let currentDate = new Date();
      this.httpService.postregistrationForm({
        createAt: currentDate,
        category: this.newCategoryForm.value.category,
        typeOfApplicant: this.newCategoryForm.value.typeOfApplicant,
        nameOfOrganisation: this.newCategoryForm.value.nameOfOrganisation,
        addressl1: this.newCategoryForm.value.addressl1,
        addressl2: this.newCategoryForm.value.addressl2,
        state: this.newCategoryForm.value.state,
        city: this.newCategoryForm.value.city,
        pincode: this.newCategoryForm.value.pincode,
        name: this.newCategoryForm.value.name,
        designation: this.newCategoryForm.value.designation,
        mobileNumber: this.newCategoryForm.value.mobileNumber,
        email: this.newCategoryForm.value.email,
        sidmMemberShipNumber: this.newCategoryForm.value.sidmMemberShipNumber,
        otherAssociationMemberShipNumber: this.newCategoryForm.value.otherAssociationMemberShipNumber,
        panNumberOfOrganization: this.newCategoryForm.value.panNumberOfOrganization,
        gstinOfOrganization: this.newCategoryForm.value.gstinOfOrganization,
        dateOfOrganization: this.newCategoryForm.value.dateOfOrganization,
        vendorOrganization1: this.newCategoryForm.value.vendorOrganization1,
        vendorOrganization2: this.newCategoryForm.value.vendorOrganization2,
        vendorOrganization3: this.newCategoryForm.value.vendorOrganization3,
        vendorOrganization4: this.newCategoryForm.value.vendorOrganization4,
        aboutCompany: this.newCategoryForm.value.vendorOrganization3,
        achievementsToJustifyApplication: this.newCategoryForm.value.achievementsToJustifyApplication,
        campareAchivement: this.newCategoryForm.value.campareAchivement,
        documentGstCertificate: this.documentGstCertificate,
        documentsOfProduct: this.documentsOfProduct,
        appreciationDocuments: this.appreciationDocuments,
        briefCompany: this.newCategoryForm.value.briefCompany,
        awardMatterToCompany: this.newCategoryForm.value.awardMatterToCompany,
        status: type,
        sidmMember: this.newCategoryForm.value.sidmMember,
        otherMember: this.newCategoryForm.value.otherMember,
        vendorOrganization: this.newCategoryForm.value.vendorOrganization,
        isappreciation: this.newCategoryForm.value.isappreciation,

      }).subscribe(data => {
        this.newCategoryForm.reset();
        this.toast.success(' Successfully Applied');
        this.routes.navigate(['/thankYou'])
      }, err => {
        console.log(err);
        this.toast.error(err);

      })
    }
    else if (!this.captcha) {
      this.submited = true;
      this.toast.error('Please verify that you are not a robot.');
    }
    else {
      console.log(this.newCategoryForm);

      this.submited = true;
      this.toast.error('Form invalid');
    }


  }
  newsavedraft(type: string) {
    this.newCategoryForm.get('typeOfApplicant')?.clearValidators()
    this.newCategoryForm.get('typeOfApplicant')?.updateValueAndValidity()
    this.newCategoryForm.get('gstinOfOrganization')?.clearValidators()
    this.newCategoryForm.get('gstinOfOrganization')?.setValidators(Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'))
    this.newCategoryForm.get('gstinOfOrganization')?.updateValueAndValidity()
    this.newCategoryForm.get('nameOfOrganisation')?.clearValidators()
    this.newCategoryForm.get('nameOfOrganisation')?.updateValueAndValidity()
    this.newCategoryForm.get('addressl1')?.clearValidators()
    this.newCategoryForm.get('addressl1')?.updateValueAndValidity()
    this.newCategoryForm.get('state')?.clearValidators()
    this.newCategoryForm.get('state')?.updateValueAndValidity()
    this.newCategoryForm.get('city')?.clearValidators()
    this.newCategoryForm.get('city')?.updateValueAndValidity()
    this.newCategoryForm.get('pincode')?.clearValidators()
    this.newCategoryForm.get('pincode')?.setValidators([Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)])
    this.newCategoryForm.get('pincode')?.updateValueAndValidity()
    this.newCategoryForm.get('name')?.clearValidators()
    this.newCategoryForm.get('name')?.updateValueAndValidity()
    this.newCategoryForm.get('sidmMember')?.clearValidators()
    this.newCategoryForm.get('sidmMember')?.updateValueAndValidity()
    this.newCategoryForm.get('otherMember')?.clearValidators()
    this.newCategoryForm.get('otherMember')?.updateValueAndValidity()
    this.newCategoryForm.get('vendorOrganization')?.clearValidators()
    this.newCategoryForm.get('vendorOrganization')?.updateValueAndValidity()
    this.newCategoryForm.get('isappreciation')?.clearValidators()
    this.newCategoryForm.get('isappreciation')?.updateValueAndValidity()
    if (this.newCategoryForm.valid && this.captcha) {
      let currentDate = new Date();
      this.httpService.postregistrationForm({
        createAt: currentDate,
        category: this.newCategoryForm.value.category,
        typeOfApplicant: this.newCategoryForm.value.typeOfApplicant,
        nameOfOrganisation: this.newCategoryForm.value.nameOfOrganisation,
        addressl1: this.newCategoryForm.value.addressl1,
        addressl2: this.newCategoryForm.value.addressl2,
        state: this.newCategoryForm.value.state,
        city: this.newCategoryForm.value.city,
        pincode: this.newCategoryForm.value.pincode,
        name: this.newCategoryForm.value.name,
        designation: this.newCategoryForm.value.designation,
        mobileNumber: this.newCategoryForm.value.mobileNumber,
        email: this.newCategoryForm.value.email,
        sidmMemberShipNumber: this.newCategoryForm.value.sidmMemberShipNumber,
        otherAssociationMemberShipNumber: this.newCategoryForm.value.otherAssociationMemberShipNumber,
        panNumberOfOrganization: this.newCategoryForm.value.panNumberOfOrganization,
        gstinOfOrganization: this.newCategoryForm.value.gstinOfOrganization,
        dateOfOrganization: this.newCategoryForm.value.dateOfOrganization,
        vendorOrganization1: this.newCategoryForm.value.vendorOrganization1,
        vendorOrganization2: this.newCategoryForm.value.vendorOrganization2,
        vendorOrganization3: this.newCategoryForm.value.vendorOrganization3,
        vendorOrganization4: this.newCategoryForm.value.vendorOrganization4,
        aboutCompany: this.newCategoryForm.value.vendorOrganization3,
        achievementsToJustifyApplication: this.newCategoryForm.value.achievementsToJustifyApplication,
        campareAchivement: this.newCategoryForm.value.campareAchivement,
        documentGstCertificate: this.documentGstCertificate,
        documentsOfProduct: this.documentsOfProduct,
        appreciationDocuments: this.appreciationDocuments,
        briefCompany: this.newCategoryForm.value.briefCompany,
        awardMatterToCompany: this.newCategoryForm.value.awardMatterToCompany,
        status: type,
        sidmMember: this.newCategoryForm.value.sidmMember,
        otherMember: this.newCategoryForm.value.otherMember,
        vendorOrganization: this.newCategoryForm.value.vendorOrganization,
        isappreciation: this.newCategoryForm.value.isappreciation,
      }).subscribe(data => {
        this.newCategoryForm.reset();
        this.toast.success(' Successfully Applied');
        this.routes.navigate(['/thankYou'])
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

  NewFormchangetoggel(conttrolName: String, value: string) {
    if (conttrolName === 'sidmMember' && value == 'Yes') {
      this.newCategoryForm.get('sidmMemberShipNumber')?.setValidators(Validators.required)
      this.newCategoryForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
      this.sidmMember = true
    }
    else if (conttrolName === 'sidmMember' && value == 'No') {
      this.sidmMember = false
      this.newCategoryForm.get('sidmMemberShipNumber')?.reset()
      this.newCategoryForm.get('sidmMsidmMemberShipNumberember')?.clearValidators()
      this.newCategoryForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
    }

    if (conttrolName === 'otherMember' && value == 'Yes') {
      this.otherMember = true
      this.newCategoryForm.get('otherAssociationMemberShipNumber')?.setValidators(Validators.required)

      this.newCategoryForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()
    }
    else if (conttrolName === 'otherMember' && value == 'No') {
      this.otherMember = false
      this.newCategoryForm.get('otherAssociationMemberShipNumber')?.reset()

      this.newCategoryForm.get('otherAssociationMemberShipNumber')?.clearValidators()
      this.newCategoryForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()

    }

    if (conttrolName === 'vendorOrganization' && value == 'Yes') {
      this.vendorOrganization = true
      this.newCategoryForm.get('vendorOrganization1')?.setValidators(Validators.required)

      this.newCategoryForm.get('vendorOrganization1')?.updateValueAndValidity()


    }
    else if (conttrolName === 'vendorOrganization' && value == 'No') {
      this.vendorOrganization = false
      this.newCategoryForm.get('vendorOrganization1')?.reset()
      this.newCategoryForm.get('vendorOrganization3')?.reset()
      this.newCategoryForm.get('vendorOrganization4')?.reset()
      this.newCategoryForm.get('vendorOrganization2')?.reset()

      this.newCategoryForm.get('vendorOrganization1')?.clearValidators()
      this.newCategoryForm.get('vendorOrganization1')?.updateValueAndValidity()

    }
    if (conttrolName === 'isappreciation' && value == 'Yes') {
      this.newCategoryForm.get('appreciationDocuments')?.setValidators(Validators.required)

      this.newCategoryForm.get('appreciationDocuments')?.updateValueAndValidity()
      this.isappreciation = true
    }
    else if (conttrolName === 'isappreciation' && value == 'No') {
      this.isappreciation = false
      this.newCategoryForm.get('appreciationDocuments')?.reset()
      this.newCategoryForm.get('appreciationDocuments')?.clearValidators()

      this.newCategoryForm.get('appreciationDocuments')?.updateValueAndValidity()
      this.appreciationDocuments = null

    }
  }

  delete(conttrolName: string) {
    if (conttrolName === 'documentGstCertificate') {
      this.documentGstCertificate = null
      this.editForm.get('documentGstCertificate')?.reset()
      this.editForm.get('documentGstCertificate')?.updateValueAndValidity()
      this.editData.documentGstCertificate = null

    }
    else if (conttrolName === 'documentsOfProduct') {
      this.documentsOfProduct = null;
      this.editForm.get('documentsOfProduct')?.reset()
      this.editForm.get('documentsOfProduct')?.updateValueAndValidity()
      this.editData.documentsOfProduct = null
    }
    else if (conttrolName === 'appreciationDocuments') {
      this.appreciationDocuments = null;
      this.editForm.get('appreciationDocuments')?.reset()
      this.editForm.get('appreciationDocuments')?.updateValueAndValidity()
      this.editData.appreciationDocuments = null
      this.editForm.get('isappreciation')?.setValue('No')
      this.isappreciation = false

      this.editForm.get('isappreciation')?.updateValueAndValidity()
    }

  }

}
