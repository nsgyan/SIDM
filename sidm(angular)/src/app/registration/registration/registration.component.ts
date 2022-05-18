import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Event, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation, panValidation, CrossPanValidation, CrossEmailValidation, GstValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registeredFieldIndexs=1;
  sidmMember = false
  association = false
  appreciationDocuments: any;
  exhibit2:any;
  exhibit1:any;
  subCategoryDoccument:any;
  financialDoccument:any;
  scanDocument: any;
  documentsOfProduct: any;
  documentGstCertificate: any;
  states: any;
  panMatch: boolean = false;
  mobileMatch: Boolean = false
  emailMatch: Boolean = false
  razorPayOptions={
    
    "amount":1,
    "currency":"INR",
    "note":{},
    "order_id":'',
    "handler":(res: any)=>{

    }
  }

  memberform: FormGroup;
  registrationForm: FormGroup
  submited: boolean = false;
  captcha: any;
  registeredOrganization: boolean = false;
  isappreciation: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    public dialog: MatDialog,
    private toast: ToastrService,
    private router: Router,
    private httpService: HttpService,
    private winRef: WindowRefService,
    private spinner: NgxSpinnerService) {
      this.localStorage.clearLocalStorage()
    this.getState()
    this.registrationForm = this.formBuilder.group({
      category: ['', Validators.required],
      typeOfApplicant: [''],
      subCategoryDoccument:[''],
      financialDoccument:[''],
      nameOfCompany: [''],
      addressl1: [''],
      addressl2: [''],
      state: [''],
      city: [''],
      pincode: ['', [Validators.pattern('^[1-9][0-9]{5}$'),Validators.minLength(6),Validators.maxLength(6)]],
      name: [''],
      designation: [''],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required],
      alterEmail:['',Validators.email],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), CellNumValidation]],
      confirmMobileNumber: ['', Validators.required],
      alterMobileNumber:['',[Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      panNumber: ['', [Validators.required, panValidation]],
      confirmPanNumber: ['', [Validators.required]],
      gstinOfCompany: ['', Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)],
      documentGstCertificate: [''],
      dateOfCompany: [''],
      sidmMember: [''],
      sidmMemberShipNumber: [''],
      association: [''],
      associationName: [''],
      registeredOrganization: [''],
      nameRegisteredOrganization: this.formBuilder.array([]),
      aboutCompany: [''],
      sidmChampionAwards:[''],
      isappreciation: [''],
      appreciationDocuments: [''],
      campareAchivement: [''],
      mudp:[''],
      productLink:[''],
      
      exhibit1:[''],
      exhibit2:[''],


      // achievementsToJustifyApplication: [''],
     
      // documentsOfProduct: [''],
      // briefCompany: [''],
      // awardMatterToCompany: [''],
      
   
     

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

  addRegisteredOrganization() {
    let control = <FormArray>this.registrationForm.get('nameRegisteredOrganization');
    control.push(
      this.formBuilder.group({
        name: ['', Validators.required],
       
      })
    );
   
  }

  removeRegisteredOrganization(index:number) {
    let control = <FormArray>this.registrationForm.get('nameRegisteredOrganization');
    control.removeAt(index)
  }

  getRegisteredOrganizationControls(){
    return this.registrationForm.get('nameRegisteredOrganization') as FormArray;
  }
  get nameRegisteredOrganization(): FormArray {
    return this.registrationForm.get('nameRegisteredOrganization') as FormArray;
  }


  gstpdfOnly($event: any, form: any) {
    let file = $event.target.files;
    if (
      file[0].type == 'application/pdf'

    ) {
      if (parseInt(file[0].size) > 2097152) {
        this.registrationForm.get(form)?.reset()
        this.registrationForm.get(form)?.updateValueAndValidity()
        this.toast.error('file to large')
      }
      else {
        this.httpService.upload(file[0]).subscribe((data: any) => {
          this.financialDoccument=data?.body;
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



    if (
      file[0].type == 'image/png' ||
      file[0].type == 'image/jpg' ||
      file[0].type == 'image/jpeg' ||
      file[0].type == 'application/pdf'
    ) {


      if (parseInt(file[0].size) > 2097152) {
      this.registrationForm.get(form)?.reset()
      this.registrationForm.get(form)?.updateValueAndValidity()
      this.toast.error('file to large')
    }
    else {
      const date = 'Wed Feb 20 2019 00:00:00 GMT-0400 (Atlantic Standard Time)';
      const time = '7:00 AM';
      this.httpService.upload(file[0]).subscribe((data: any) => {
        if (form === 'subCategoryDoccument') {
          this.subCategoryDoccument = data?.body;
        }
        else if(form === 'documentGstCertificate')
        {
          this.documentGstCertificate = data?.body;
        }
        else if(form === 'exhibit1')
        {
          this.exhibit1=data?.body;
        }
        else if(form === 'exhibit2')
        {
          this.exhibit2=data?.body;
        }
        else if (form === 'documentsOfProduct') {
          this.documentsOfProduct = data?.body;
        }
        else if (form === 'appreciationDocuments') {
          this.appreciationDocuments = data?.body;

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
    this.registrationForm.get('subCategoryDoccument')?.clearValidators()
    this.registrationForm.get('subCategoryDoccument')?.updateValueAndValidity()
    this.registrationForm.get('financialDoccument')?.clearValidators()
    this.registrationForm.get('financialDoccument')?.updateValueAndValidity()
    this.registrationForm.get('nameOfCompany')?.clearValidators()
    this.registrationForm.get('nameOfCompany')?.updateValueAndValidity()
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
    this.registrationForm.get('designation')?.clearValidators()
    this.registrationForm.get('designation')?.updateValueAndValidity()
    this.registrationForm.get('gstinOfCompany')?.clearValidators()
    this.registrationForm.get('gstinOfCompany')?.setValidators( Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/))
    this.registrationForm.get('gstinOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('documentGstCertificate')?.clearValidators()
    this.registrationForm.get('documentGstCertificate')?.updateValueAndValidity()
    this.registrationForm.get('dateOfCompany')?.clearValidators()
    this.registrationForm.get('dateOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('sidmMember')?.clearValidators()
    this.registrationForm.get('sidmMember')?.updateValueAndValidity()
    this.registrationForm.get('association')?.clearValidators()
    this.registrationForm.get('association')?.updateValueAndValidity()
    this.registrationForm.get('registeredOrganization')?.clearValidators()
    this.registrationForm.get('registeredOrganization')?.updateValueAndValidity()
    this.registrationForm.get('aboutCompany')?.clearValidators()
    this.registrationForm.get('aboutCompany')?.updateValueAndValidity()
    this.registrationForm.get('sidmChampionAwards')?.clearValidators()
    this.registrationForm.get('sidmChampionAwards')?.updateValueAndValidity()
    this.registrationForm.get('isappreciation')?.clearValidators()
    this.registrationForm.get('isappreciation')?.updateValueAndValidity()
    this.registrationForm.get('campareAchivement')?.clearValidators()
    this.registrationForm.get('campareAchivement')?.updateValueAndValidity()
    this.registrationForm.get('mudp')?.clearValidators()
    this.registrationForm.get('mudp')?.updateValueAndValidity()
    this.registrationForm.get('productLink')?.clearValidators()
    this.registrationForm.get('productLink')?.updateValueAndValidity()
    this.registrationForm.get('exhibit1')?.clearValidators()
    this.registrationForm.get('exhibit1')?.updateValueAndValidity()
    this.registrationForm.get('exhibit2')?.clearValidators()
    this.registrationForm.get('exhibit2')?.updateValueAndValidity()
    if (this.registrationForm.valid && this.captcha) {
      let currentDate = new Date();
      this.httpService.postregistrationForm({
        category: this.registrationForm.value.category,
        typeOfApplicant: this.registrationForm.value.typeOfApplicant,
        subCategoryDoccument:this.subCategoryDoccument,
        financialDoccument:this.financialDoccument,
        nameOfCompany: this.registrationForm.value.nameOfCompany,
        addressl1: this.registrationForm.value.addressl1,
        addressl2: this.registrationForm.value.addressl2,
        state: this.registrationForm.value.state,
        city: this.registrationForm.value.city,
        pincode: this.registrationForm.value.pincode,
        name: this.registrationForm.value.name,
        designation: this.registrationForm.value.designation,
        email: this.registrationForm.value.email,
        mobileNumber: this.registrationForm.value.mobileNumber,
        panNumber: this.registrationForm.value.panNumber,
        gstinOfCompany: this.registrationForm.value.gstinOfCompany,
        documentGstCertificate: this.documentGstCertificate,
        dateOfCompany: this.registrationForm.value.dateOfCompany,
        sidmMember: this.registrationForm.value.sidmMember,
        sidmMemberShipNumber: this.registrationForm.value.sidmMemberShipNumber,
        association: this.registrationForm.value.association,
        associationName: this.registrationForm.value.associationName,
        registeredOrganization: this.registrationForm.value.registeredOrganization,
   nameRegisteredOrganization: this.registrationForm.value.nameRegisteredOrganization, 
        aboutCompany: this.registrationForm.value.aboutCompany,
        sidmChampionAwards: this.registrationForm.value.sidmChampionAwards,
        isappreciation: this.registrationForm.value.isappreciation,
        appreciationDocuments: this.appreciationDocuments,
        campareAchivement: this.registrationForm.value.campareAchivement,
        mudp: this.registrationForm.value.mudp,
        productLink: this.registrationForm.value.productLink,
        exhibit1:this.exhibit1,
        exhibit2:this.exhibit2,
        alterMobileNumber:this.registrationForm.value.alterMobileNumber,
        alterEmail:this.registrationForm.value.alterEmail,
        status: type,
      }).subscribe(data => {
        console.log(' Successfully Applied');
        this.registrationForm.reset();
        this.toast.success(' Successfully Applied');
        let url: string = "/thankYou/" + 'dsfffdsdfds'
        this.router.navigateByUrl(url);
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

  checkemail(event: any) {
    console.log('pandggg');
    this.registrationForm.get('confirmEmail')?.reset()
    const email = event.target.value ? event.target.value.toLowerCase() : this.registrationForm.get('email')?.value
    if (email) {
      this.httpService.checkEmail({ email: email })
        .subscribe((data: any) => {
          if (email === data?.email) {
            this.registrationForm.get('email')?.setErrors({ isExist: true });
          }

        })

    }
  }
  checkMobile(event: any) {
    console.log('mobile');
    
    this.registrationForm.get('confirmMobileNumber')?.reset()
    const mobileNumber = event.target.value ? event.target.value : this.registrationForm.get('mobileNumber')?.value
    if (mobileNumber) {
      this.httpService.checkMobile({ mobileNumber: mobileNumber })
        .subscribe((data: any) => {

          if (mobileNumber === data?.mobileNumber) {
            this.registrationForm.get('mobileNumber')?.setErrors({ isExist: true });
          }

        })

    }
  }
  checkPan(event: any) {
    console.log('pan');
    
    this.registrationForm.get('confirmPanNumber')?.reset()
    const panNumber = event.target.value ? event.target.value.toUpperCase() : this.registrationForm.get('panNumber')?.value
    if (panNumber) {
      this.httpService.checkPan({ panNumber: panNumber })
        .subscribe((data: any) => {
          if (panNumber === data?.panNumber) {
            this.registrationForm.get('panNumber')?.setErrors({ isExist: true });
          }

        })

    }
  }

  confirmEmail(event: any,) {
    if (event.target.value.toLowerCase() !== this.registrationForm.value.email.toLowerCase()) {
      this.registrationForm.get('confirmEmail')?.setErrors({ confirmEmail: true })
    }
    else {
      const email = event.target.value ? event.target.value.toLowerCase() : this.registrationForm.get('email')?.value
      if (email) {
        this.httpService.checkEmail({ email: email })
          .subscribe((data: any) => {
            if (email === data?.email) {
              this.registrationForm.get('email')?.setErrors({ isExist: true });
            }

          })

      }

    }
  }

  confirmmobile(event: any,) {
 
    if (event.target.value !== this.registrationForm.value.mobileNumber) {
      this.registrationForm.get('confirmMobileNumber')?.setErrors({ confirmMobileNumber: true })
    }
    else {
      const mobileNumber = event.target.value ? event.target.value : this.registrationForm.get('mobileNumber')?.value
      if (mobileNumber) {
        this.httpService.checkMobile({ mobileNumber: mobileNumber })
          .subscribe((data: any) => {
            if (mobileNumber === data?.mobileNumber) {
              this.registrationForm.get('mobileNumber')?.setErrors({ isExist: true });
            }

          })

      }
    }
  }

  confirmPan(event: any,) {

    if (event.target.value.toUpperCase() !== this.registrationForm.value.panNumber.toUpperCase()) {
      this.registrationForm.get('confirmPanNumber')?.setErrors({ confirmPanNumber: true })
    }
    else {
      const panNumber = event.target.value ? event.target.value.toLowerCase() : this.registrationForm.get('panNumber')?.value
      if (panNumber) {
        this.httpService.checkPan({ panNumber: panNumber })
          .subscribe((data: any) => {
            if (panNumber === data?.panNumber) {
              this.registrationForm.get('panNumber')?.setErrors({ isExist: true });
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
    this.registrationForm.get('subCategoryDoccument')?.setValidators(Validators.required)
    this.registrationForm.get('subCategoryDoccument')?.updateValueAndValidity()
    this.registrationForm.get('financialDoccument')?.setValidators(Validators.required)
    this.registrationForm.get('financialDoccument')?.updateValueAndValidity()
    this.registrationForm.get('nameOfCompany')?.setValidators(Validators.required)
    this.registrationForm.get('nameOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('addressl1')?.setValidators(Validators.required)
    this.registrationForm.get('addressl1')?.updateValueAndValidity()
    this.registrationForm.get('state')?.setValidators(Validators.required)
    this.registrationForm.get('state')?.updateValueAndValidity()
    this.registrationForm.get('city')?.setValidators(Validators.required)
    this.registrationForm.get('city')?.updateValueAndValidity()
    this.registrationForm.get('pincode')?.setValidators([Validators.required,Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)])
    this.registrationForm.get('pincode')?.updateValueAndValidity()
    this.registrationForm.get('name')?.setValidators(Validators.required)
    this.registrationForm.get('name')?.updateValueAndValidity()
    this.registrationForm.get('designation')?.setValidators(Validators.required)
    this.registrationForm.get('designation')?.updateValueAndValidity()
    this.registrationForm.get('gstinOfCompany')?.setValidators([Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)])
    this.registrationForm.get('gstinOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('documentGstCertificate')?.setValidators(Validators.required)
    this.registrationForm.get('documentGstCertificate')?.updateValueAndValidity()
    this.registrationForm.get('dateOfCompany')?.setValidators(Validators.required)
    this.registrationForm.get('dateOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('sidmMember')?.setValidators(Validators.required)
    this.registrationForm.get('sidmMember')?.updateValueAndValidity()
    this.registrationForm.get('association')?.setValidators(Validators.required)
    this.registrationForm.get('association')?.updateValueAndValidity()
    this.registrationForm.get('registeredOrganization')?.setValidators(Validators.required)
    this.registrationForm.get('registeredOrganization')?.updateValueAndValidity()
    this.registrationForm.get('aboutCompany')?.setValidators(Validators.required)
    this.registrationForm.get('aboutCompany')?.updateValueAndValidity()
    this.registrationForm.get('sidmChampionAwards')?.setValidators(Validators.required)
    this.registrationForm.get('sidmChampionAwards')?.updateValueAndValidity()
    this.registrationForm.get('isappreciation')?.setValidators(Validators.required)
    this.registrationForm.get('isappreciation')?.updateValueAndValidity()
    this.registrationForm.get('campareAchivement')?.setValidators(Validators.required)
    this.registrationForm.get('campareAchivement')?.updateValueAndValidity()
    this.registrationForm.get('mudp')?.setValidators(Validators.required)
    this.registrationForm.get('mudp')?.updateValueAndValidity()
    this.registrationForm.get('exhibit1')?.setValidators(Validators.required)
    this.registrationForm.get('exhibit1')?.updateValueAndValidity()
    this.registrationForm.get('exhibit2')?.setValidators(Validators.required)
    this.registrationForm.get('exhibit2')?.updateValueAndValidity()
    if (this.registrationForm.valid && this.captcha) {
      let currentDate = new Date();
      this.httpService.postregistrationForm({
        createAt: currentDate,
        category: this.registrationForm.value.category,
        typeOfApplicant: this.registrationForm.value.typeOfApplicant,
        subCategoryDoccument:this.subCategoryDoccument,
        financialDoccument:this.financialDoccument,
        nameOfCompany: this.registrationForm.value.nameOfCompany,
        addressl1: this.registrationForm.value.addressl1,
        addressl2: this.registrationForm.value.addressl2,
        state: this.registrationForm.value.state,
        city: this.registrationForm.value.city,
        pincode: this.registrationForm.value.pincode,
        name: this.registrationForm.value.name,
        designation: this.registrationForm.value.designation,
        email: this.registrationForm.value.email,
        mobileNumber: this.registrationForm.value.mobileNumber,
        panNumber: this.registrationForm.value.panNumber,
        gstinOfCompany: this.registrationForm.value.gstinOfCompany,
        documentGstCertificate: this.documentGstCertificate,
        dateOfCompany: this.registrationForm.value.dateOfCompany,
        sidmMember: this.registrationForm.value.sidmMember,
        sidmMemberShipNumber: this.registrationForm.value.sidmMemberShipNumber,
        association: this.registrationForm.value.association,
        associationName: this.registrationForm.value.associationName,
        registeredOrganization: this.registrationForm.value.registeredOrganization,
   nameRegisteredOrganization: this.registrationForm.value.nameRegisteredOrganization, 
        aboutCompany: this.registrationForm.value.aboutCompany,
        sidmChampionAwards: this.registrationForm.value.sidmChampionAwards,
        isappreciation: this.registrationForm.value.isappreciation,
        appreciationDocuments: this.appreciationDocuments,
        campareAchivement: this.registrationForm.value.campareAchivement,
        mudp: this.registrationForm.value.mudp,
        productLink: this.registrationForm.value.productLink,
        exhibit1:this.exhibit1,
        exhibit2:this.exhibit2,
        alterMobileNumber:this.registrationForm.value.alterMobileNumber,
        alterEmail:this.registrationForm.value.alterEmail,
        status: type,
      }).subscribe((data:any) => {
        this.registrationForm.reset();

       
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
    else if (type === 'Pending') {
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

    if (conttrolName === 'association' && value == 'Yes') {
      this.association = true
      this.registrationForm.get('associationName')?.setValidators(Validators.required)

      this.registrationForm.get('associationName')?.updateValueAndValidity()
    }
    else if (conttrolName === 'association' && value == 'No') {
      this.association = false
      this.registrationForm.get('associationName')?.reset()

      this.registrationForm.get('associationName')?.clearValidators()
      this.registrationForm.get('associationName')?.updateValueAndValidity()

    }

    if (conttrolName === 'registeredOrganization' && value == 'Yes') {
      this.registeredOrganization = true
      
      let control = <FormArray>this.registrationForm.get('nameRegisteredOrganization');
    if (control.length<1) {
      this.addRegisteredOrganization()
      }
    
      this.registrationForm.get('nameRegisteredOrganization')?.setValidators(Validators.required)
      this.registrationForm.get('nameRegisteredOrganization')?.updateValueAndValidity()

    }
    else if (conttrolName === 'registeredOrganization' && value == 'No') {
      this.registeredOrganization = false
      this.registrationForm.get('nameRegisteredOrganization')?.reset()
      let control = <FormArray>this.registrationForm.get('nameRegisteredOrganization');
      while (control.length) {
        control.removeAt(0);
      }
      this.registrationForm.get('nameRegisteredOrganization')?.clearValidators()
      this.registrationForm.get('nameRegisteredOrganization')?.updateValueAndValidity()
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

  payNow(){
    this.httpService.paynow({
      typeOfApplicant:this.registrationForm.value.typeOfApplicantm,
      category:this.registrationForm.value.category,
      panNumber:this.registrationForm.value.typeOfApplicantm,
      mobileNumber:this.registrationForm.value.category,
      email:this.registrationForm.value.category,
      
    }).subscribe((data:any)=>{
this.razorPayOptions.amount=data.amount
this.razorPayOptions.order_id=data.id
this.razorPayOptions.note=data.notes
this.razorPayOptions.handler=  (response) => {
  this. razorPayshandler(response,this.razorPayOptions.amount,this.razorPayOptions.note); //does not work as cannot identify 'this'
}
const rzp = new this.winRef.nativeWindow.Razorpay(this.razorPayOptions);
rzp.open();

      
    })
  }

  razorPayshandler(response:any,amount:any,note:any){
  
  if(response){
    this.spinner.show();
  let razorpay_payment_id= response.razorpay_payment_id
  let razorpay_order_id= response.razorpay_order_id
  let createAt = new Date();
  this.finalSubmit('Pending Approval')

  this.httpService.verifypayment({note,razorpay_payment_id,razorpay_order_id,amount,createAt}).subscribe(data=>{
    this.spinner.hide();
    this.toast.success(' Successfully Applied');
    let url: string = "/thankYou/" + 'dsffsdfds'
    this.router.navigateByUrl(url);
  },err=>{
    this.toast.error('Payment failed');

  })
}
else{
  this.savedraft('Pending')
  this.toast.error('Payment failed');

}
  }


  openModel(type:any){

    this.registrationForm.get('category')?.setValidators(Validators.required)
    this.registrationForm.get('category')?.updateValueAndValidity()
    this.registrationForm.get('typeOfApplicant')?.setValidators(Validators.required)
    this.registrationForm.get('typeOfApplicant')?.updateValueAndValidity()
    this.registrationForm.get('subCategoryDoccument')?.setValidators(Validators.required)
    this.registrationForm.get('subCategoryDoccument')?.updateValueAndValidity()
    this.registrationForm.get('financialDoccument')?.setValidators(Validators.required)
    this.registrationForm.get('financialDoccument')?.updateValueAndValidity()
    this.registrationForm.get('nameOfCompany')?.setValidators(Validators.required)
    this.registrationForm.get('nameOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('addressl1')?.setValidators(Validators.required)
    this.registrationForm.get('addressl1')?.updateValueAndValidity()
    this.registrationForm.get('state')?.setValidators(Validators.required)
    this.registrationForm.get('state')?.updateValueAndValidity()
    this.registrationForm.get('city')?.setValidators(Validators.required)
    this.registrationForm.get('city')?.updateValueAndValidity()
    this.registrationForm.get('pincode')?.setValidators([Validators.required,Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)])
    this.registrationForm.get('pincode')?.updateValueAndValidity()
    this.registrationForm.get('name')?.setValidators(Validators.required)
    this.registrationForm.get('name')?.updateValueAndValidity()
    this.registrationForm.get('designation')?.setValidators(Validators.required)
    this.registrationForm.get('designation')?.updateValueAndValidity()
    this.registrationForm.get('gstinOfCompany')?.setValidators([Validators.required, Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)])
    this.registrationForm.get('gstinOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('documentGstCertificate')?.setValidators(Validators.required)
    this.registrationForm.get('documentGstCertificate')?.updateValueAndValidity()
    this.registrationForm.get('dateOfCompany')?.setValidators(Validators.required)
    this.registrationForm.get('dateOfCompany')?.updateValueAndValidity()
    this.registrationForm.get('sidmMember')?.setValidators(Validators.required)
    this.registrationForm.get('sidmMember')?.updateValueAndValidity()
    this.registrationForm.get('association')?.setValidators(Validators.required)
    this.registrationForm.get('association')?.updateValueAndValidity()
    this.registrationForm.get('registeredOrganization')?.setValidators(Validators.required)
    this.registrationForm.get('registeredOrganization')?.updateValueAndValidity()
    this.registrationForm.get('aboutCompany')?.setValidators(Validators.required)
    this.registrationForm.get('aboutCompany')?.updateValueAndValidity()
    this.registrationForm.get('sidmChampionAwards')?.setValidators(Validators.required)
    this.registrationForm.get('sidmChampionAwards')?.updateValueAndValidity()
    this.registrationForm.get('isappreciation')?.setValidators(Validators.required)
    this.registrationForm.get('isappreciation')?.updateValueAndValidity()
    this.registrationForm.get('campareAchivement')?.setValidators(Validators.required)
    this.registrationForm.get('campareAchivement')?.updateValueAndValidity()
    this.registrationForm.get('mudp')?.setValidators(Validators.required)
    this.registrationForm.get('mudp')?.updateValueAndValidity()
    this.registrationForm.get('exhibit1')?.setValidators(Validators.required)
    this.registrationForm.get('exhibit1')?.updateValueAndValidity()
    this.registrationForm.get('exhibit2')?.setValidators(Validators.required)
    this.registrationForm.get('exhibit2')?.updateValueAndValidity()
    if (this.registrationForm.valid && this.captcha) {



    const dialogRef = this.dialog.open(ModelComponent, {
      width: '500px',
      data: {type:type},
    });
    dialogRef.afterClosed().subscribe(result => {
    if(result==='no'){
      console.log('no'); 
    }
    else if(result==='ok'){
      this.payNow()
    }
     
    });
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

}
