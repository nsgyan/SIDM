import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { WindowRefService } from 'src/app/shared/services/window-ref.service';
import { environment } from 'src/environments/environment.prod';
import { formatDate, Location } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { ModelComponent } from 'src/app/shared/services/model/model.component';
 
@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  paymentDetails:any
  appreciationDocuments: any;
  sidmMember = false
  association = false
  vendorOrganization: boolean = false;
  isappreciation: boolean = false;
  scanDocument: any;
  documentsOfProduct: any;
  documentGstCertificate: any;
  userId: any
  EditForm = true
 
  OfflinePayment!:FormGroup ;
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
  financialDoccument: any;
  subCategoryDoccument: any;
  exhibit1: any;
  exhibit2: any;
  registeredOrganization: boolean = false;
  razorPayOptions={
    
    "amount":1,
    "currency":"INR",
    "note":{},
    "order_id":'',
    "handler":(res: any)=>{

    }
  }
  modeofPayment: string[] | undefined;
  OfflinepaymentDetails: any;
  remark: any;
  constructor(private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private httpService: HttpService,
    private routes: Router,
    private location: Location,
    private winRef: WindowRefService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    const id = this.route.snapshot.paramMap.get('id')
    this.OfflinePayment=this.formBuilder.group({
      id:['',Validators.required],
      nameOfBank:['',Validators.required],
      modeOfPayment:['',Validators.required],
      amount:['',Validators.required],
      dateOfPayment:['',Validators.required],
      transactionDetails:['',Validators.required]
    })

    this.getState()
    this.httpService.getdetails(id).
      subscribe((data: any) => {
        
          if (data.category === 'cat1') {
            this.cat1 = false
            data.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
          }
          else if (data.category === 'cat2') {
            this.cat2 = false
            data.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
          }
          else if (data.category === 'cat3') {
            this.cat3 = false
            data.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
          }
          else if (data.category === 'cat4') {
            this.cat4 = false
            data.category = 'C4- Export Performance of Defence & Aerospace Products'
          }  
      
        this.memberData = data;
      
          this.email =  this.memberData.email
          this.mobilenumber =  this.memberData.mobileNumber;
          this.pan =  this.memberData.panNumber;
       
       
      }, err => {
        this.toast.error(err.error);
        this.localStorage.clearLocalStorage()
        window.location.reload()
        this.routes.navigate(['login/member'])

      })

     
  }

  ngOnInit(): void {



  }





  getState() {
    this.httpService.getStateList()
      .subscribe(data => {
        this.states = data

      },err=>{
        this.toast.error('Please Login Again');
        this.localStorage.clearLocalStorage()
        window.location.reload()
      })
  }


  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }

  pickclender() {
    return false
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
    this.association = false;
    this.sidmMember = false
    this.submited = false
    
    this.isappreciation = false
    this.submited = false
    if (item.status !== 'Approved') {
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
          this.documentGstCertificate = data.documentGstCertificate
          data.documentGstCertificate = environment.download + data.documentGstCertificate
          
        }
        if (data.appreciationDocuments) {
          this.appreciationDocuments = data.appreciationDocuments
          data.appreciationDocuments = environment.download + data.appreciationDocuments   
        }
        if (data.subCategoryDoccument) {
          this.subCategoryDoccument = data.subCategoryDoccument
          data.subCategoryDoccument = environment.download + data.subCategoryDoccument         
        }
        if (data.financialDoccument) {
          this.financialDoccument = data.financialDoccument
          data.financialDoccument = environment.download + data.financialDoccument         
        }
        if (data.exhibit1) {
          this.exhibit1 = data.exhibit1
          data.exhibit1 = environment.download + data.exhibit1         
        }
        if (data.exhibit2) {
          this.exhibit2 = data.exhibit2
          data.exhibit2 = environment.download + data.exhibit2          
        }

        data.sidmMember === 'Yes' ? this.sidmMember = true : ''
        data.association === 'Yes' ? this.association = true : ''
        data.registeredOrganization === 'Yes' ? this.registeredOrganization = true : '';
        data.isappreciation === 'Yes' ? this.isappreciation = true : ''

        this.editData = data
        this.catagery = this.editData.catagery
        this.editData.panNumber = this.editData.panNumber
        this.editForm = this.formBuilder.group({
       
          typeOfApplicant: [this.editData.typeOfApplicant ? this.editData.typeOfApplicant : ''],
          subCategoryDoccument: [''],
          financialDoccument: [''],
          nameOfCompany: [this.editData.nameOfCompany ? this.editData.nameOfCompany : ''],
          addressl1: [this.editData.addressl1 ? this.editData.addressl1 : ''],
          addressl2: [this.editData.addressl2 ? this.editData.addressl2 : ''],
          state: [this.editData.state ? this.editData.state : ''],
          city: [this.editData.city ? this.editData.city : ''],
          pincode: [this.editData.pincode ? this.editData.pincode : '', [Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6)]],
          name: [this.editData.name ? this.editData.name : ''],
          designation: [this.editData.designation ? this.editData.designation : ''],
          email: [this.editData.email ? this.editData.email : ''],
          mobileNumber: [this.editData.mobileNumber ? this.editData.mobileNumber : ''],
          panNumber: [this.editData.panNumber ? this.editData.panNumber : ''],
          gstinOfCompany: [this.editData.gstinOfCompany ? this.editData.gstinOfCompany : '', Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)],
          documentGstCertificate: [''],
          dateOfCompany: [this.editData.dateOfCompany ? this.editData.dateOfCompany : ''],
          sidmMember: [this.editData.sidmMember ? this.editData.sidmMember : ''],
          sidmMemberShipNumber: [this.editData.sidmMemberShipNumber ? this.editData.sidmMemberShipNumber : ''],
          association: [this.editData.association ? this.editData.association : ''],
          associationName: [this.editData.associationName ? this.editData.associationName : ''],
          registeredOrganization: [this.editData.registeredOrganization ? this.editData.registeredOrganization : ''],
          nameRegisteredOrganization: this.formBuilder.array([ ]),
          aboutCompany: [this.editData.aboutCompany ? this.editData.aboutCompany : ''],
          sidmChampionAwards: [this.editData.sidmChampionAwards ? this.editData.sidmChampionAwards : ''],
          isappreciation: [this.editData.isappreciation ? this.editData.isappreciation : ''],
          appreciationDocuments: [''],
          campareAchivement: [this.editData.campareAchivement ? this.editData.campareAchivement : ''],
          mudp: [this.editData.mudp ? this.editData.mudp : ''],
          productLink: [this.editData.productLink ? this.editData.productLink : ''],
          alterMobileNumber:[this.editData.alterMobileNumber,[Validators.maxLength(10),  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
          alterEmail:[this.editData.alterEmail,Validators.email],

          exhibit1: [''],
          exhibit2: [''],

         
        })
        if (this.editData.sidmMember === 'Yes') {
          this.editForm.get('sidmMemberShipNumber')?.setValidators(Validators.required)
          this.editForm.get('sidmMemberShipNumber')?.updateValueAndValidity()

        }
        if (this.editData.association === 'Yes') {
          this.editForm.get('otherAssociationMemberShipNumber')?.setValidators(Validators.required)

          this.editForm.get('otherAssociationMemberShipNumber')?.updateValueAndValidity()

        }
        if (this.editData.registeredOrganization === 'Yes') {
          let control = <FormArray>this.editForm.get('nameRegisteredOrganization');
         this.editData.nameRegisteredOrganization.map((item:any)=>{
          control.push(
            this.formBuilder.group({
              name: [item.name, Validators.required],            
            })
          );
           
         })
                          
        }
      },err=>{
        this.toast.error('oops no internet connection login again');
        this.localStorage.clearLocalStorage()
        window.location.reload()
      })
    }
    else {
      let url: string = "/detail/" + item._id
      this.routes.navigateByUrl(url);
    }

  }

  addRegisteredOrganization() {
    let control = <FormArray>this.editForm.get('nameRegisteredOrganization');
    control.push(
      this.formBuilder.group({
        name: ['', Validators.required],      
      })
    );
   
  }

  removeRegisteredOrganization(index:number) {
    let control = <FormArray>this.editForm.get('nameRegisteredOrganization');
    control.removeAt(index)
  }

  getRegisteredOrganizationControls(){
    return this.editForm.get('nameRegisteredOrganization') as FormArray;
  }

  get nameRegisteredOrganization(): FormArray {
    return this.editForm.get('nameRegisteredOrganization') as FormArray;
  }


  gstpdfOnly($event: any, form: any) {
    let file = $event.target.files;
    if (
      file[0].type == 'application/pdf'

    ) {
      if (parseInt(file[0].size) > 2097152) {
        this.editForm.get(form)?.reset()
        this.editForm.get(form)?.updateValueAndValidity()
        this.toast.error('file to large')
      }
      else {
        this.httpService.upload(file[0]).subscribe((data: any) => {
          this.financialDoccument=data.body;
        },err=>{
          this.toast.error('Please try again');
          window.location.reload()

        })

      }
    }
    else {
      this.toast.error('File uploaded is invalid!')
      this.editForm.get(form)?.reset()
      this.editForm.get(form)?.updateValueAndValidity()

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
      this.editForm.get('sidmMemberShipNumber')?.clearValidators()
      this.editForm.get('sidmMemberShipNumber')?.updateValueAndValidity()
    }

    if (conttrolName === 'association' && value == 'Yes') {
      this.association = true
      this.editForm.get('associationName')?.setValidators(Validators.required)

      this.editForm.get('associationName')?.updateValueAndValidity()
    }
    else if (conttrolName === 'association' && value == 'No') {
      this.association = false
      this.editForm.get('associationName')?.reset()

      this.editForm.get('associationName')?.clearValidators()
      this.editForm.get('associationName')?.updateValueAndValidity()
    }

    if (conttrolName === 'registeredOrganization' && value == 'Yes') {
      this.registeredOrganization = true
      let control = <FormArray>this.editForm.get('nameRegisteredOrganization');
      if (control.length<1) {
        this.addRegisteredOrganization()
        }
      
      this.editForm.get('nameRegisteredOrganization')?.setValidators(Validators.required)

      this.editForm.get('nameRegisteredOrganization')?.updateValueAndValidity()

    }
    else if (conttrolName === 'registeredOrganization' && value == 'No') {
      this.registeredOrganization = false
      this.editForm.get('nameRegisteredOrganization')?.reset()
      let control = <FormArray>this.editForm.get('nameRegisteredOrganization');
      while (control.length) {
        control.removeAt(0);
      }
      this.editForm.get('nameRegisteredOrganization')?.clearValidators()
      this.editForm.get('nameRegisteredOrganization')?.updateValueAndValidity()
    }
    if (conttrolName === 'isappreciation' && value == 'Yes') {

      this.isappreciation = true
      this.editForm.get('appreciationDocuments')?.setValidators(Validators.required)

      this.editForm.get('appreciationDocuments')?.updateValueAndValidity()
    }
    else if (conttrolName === 'isappreciation' && value == 'No') {
      this.isappreciation = false
      this.editForm.get('appreciationDocuments')?.reset()

      this.editForm.get('appreciationDocuments')?.clearValidators()

      this.editForm.get('appreciationDocuments')?.updateValueAndValidity()
      this.appreciationDocuments = null

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
      this.editForm.get(form)?.reset()
      this.editForm.get(form)?.updateValueAndValidity()
      this.toast.error('file to large')
    }
    else {
      const date = 'Wed Feb 20 2019 00:00:00 GMT-0400 (Atlantic Standard Time)';
      const time = '7:00 AM';
      this.httpService.upload(file[0]).subscribe((data: any) => {
        if (form === 'subCategoryDoccument') {
          this.subCategoryDoccument = data.body;
        }
        else if(form === 'documentGstCertificate')
        {
          this.documentGstCertificate = data.body;
        }
        else if(form === 'exhibit1')
        {
          this.exhibit1=data.body;
        }
        else if(form === 'exhibit2')
        {
          this.exhibit2=data.body;
        }
        else if (form === 'documentsOfProduct') {
          this.documentsOfProduct = data.body;
        }
        else if (form === 'appreciationDocuments') {
          this.appreciationDocuments = data.body;
        }
      },err=>{
        this.toast.error('Please try again');
        window.location.reload()
      })
 }
    }
    else {
      this.toast.error('File uploaded is invalid!')
      this.editForm.get(form)?.reset()
      this.editForm.get(form)?.updateValueAndValidity()

    }
  }

  finalSubmit(type: string) {
    this.editForm.get('typeOfApplicant')?.setValidators(Validators.required)
    this.editForm.get('typeOfApplicant')?.updateValueAndValidity()
    if(!this.editData.subCategoryDoccument){
    this.editForm.get('subCategoryDoccument')?.setValidators(Validators.required)
    this.editForm.get('subCategoryDoccument')?.updateValueAndValidity()}
    if(!this.editData.financialDoccument){
    this.editForm.get('financialDoccument')?.setValidators(Validators.required)
    this.editForm.get('financialDoccument')?.updateValueAndValidity()}
    this.editForm.get('nameOfCompany')?.setValidators(Validators.required)
    this.editForm.get('nameOfCompany')?.updateValueAndValidity()
    this.editForm.get('addressl1')?.setValidators(Validators.required)
    this.editForm.get('addressl1')?.updateValueAndValidity()
    this.editForm.get('state')?.setValidators(Validators.required)
    this.editForm.get('state')?.updateValueAndValidity()
    this.editForm.get('city')?.setValidators(Validators.required)
    this.editForm.get('city')?.updateValueAndValidity()
    this.editForm.get('pincode')?.setValidators(Validators.required)
    this.editForm.get('pincode')?.setValidators([Validators.pattern('^[1-9][0-9]{5}$'), Validators.minLength(6), Validators.maxLength(6),Validators.required])
    this.editForm.get('pincode')?.updateValueAndValidity()
    this.editForm.get('name')?.setValidators(Validators.required)
    this.editForm.get('name')?.updateValueAndValidity()
    this.editForm.get('designation')?.setValidators(Validators.required)
    this.editForm.get('designation')?.updateValueAndValidity()
    this.editForm.get('gstinOfCompany')?.setValidators([Validators.required,Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/)])
    this.editForm.get('gstinOfCompany')?.updateValueAndValidity()
    if(!this.editData.documentGstCertificate){
    this.editForm.get('documentGstCertificate')?.setValidators(Validators.required)
    this.editForm.get('documentGstCertificate')?.updateValueAndValidity()}
    this.editForm.get('dateOfCompany')?.setValidators(Validators.required)
    this.editForm.get('dateOfCompany')?.updateValueAndValidity()
    this.editForm.get('sidmMember')?.setValidators(Validators.required)
    this.editForm.get('sidmMember')?.updateValueAndValidity()
    this.editForm.get('association')?.setValidators(Validators.required)
    this.editForm.get('association')?.updateValueAndValidity()
    this.editForm.get('registeredOrganization')?.setValidators(Validators.required)
    this.editForm.get('registeredOrganization')?.updateValueAndValidity()
    this.editForm.get('aboutCompany')?.setValidators(Validators.required)
    this.editForm.get('aboutCompany')?.updateValueAndValidity()
    this.editForm.get('sidmChampionAwards')?.setValidators(Validators.required)
    this.editForm.get('sidmChampionAwards')?.updateValueAndValidity()
    this.editForm.get('isappreciation')?.setValidators(Validators.required)
    this.editForm.get('isappreciation')?.updateValueAndValidity() 
    this.editForm.get('campareAchivement')?.setValidators(Validators.required)
    this.editForm.get('campareAchivement')?.updateValueAndValidity()
    this.editForm.get('mudp')?.setValidators(Validators.required)
    this.editForm.get('mudp')?.updateValueAndValidity()
    if(!this.editData.exhibit1){
    this.editForm.get('exhibit1')?.setValidators(Validators.required)
    this.editForm.get('exhibit1')?.updateValueAndValidity()}
    if(!this.editData.exhibit2){
    this.editForm.get('exhibit2')?.setValidators(Validators.required)
    this.editForm.get('exhibit2')?.updateValueAndValidity()}
    if (this.editForm.valid && this.captcha) {
      this.httpService.updateform(this.editData._id, {
        typeOfApplicant: this.editForm.value.typeOfApplicant,
        subCategoryDoccument: this.subCategoryDoccument,
        financialDoccument: this.financialDoccument,
        nameOfCompany: this.editForm.value.nameOfCompany,
        addressl1: this.editForm.value.addressl1,
        addressl2: this.editForm.value.addressl2,
        state: this.editForm.value.state,
        city: this.editForm.value.city,
        pincode: this.editForm.value.pincode,
        name: this.editForm.value.name,
        designation: this.editForm.value.designation,
        email: this.editForm.value.email,
        mobileNumber: this.editForm.value.mobileNumber,
        panNumber: this.editForm.value.panNumber,
        gstinOfCompany: this.editForm.value.gstinOfCompany,
        documentGstCertificate: this.documentGstCertificate,
        dateOfCompany: this.editForm.value.dateOfCompany,
        sidmMember: this.editForm.value.sidmMember,
        sidmMemberShipNumber: this.editForm.value.sidmMemberShipNumber,
        association: this.editForm.value.association,
        associationName: this.editForm.value.associationName,
        registeredOrganization: this.editForm.value.registeredOrganization,
        nameRegisteredOrganization: this.editForm.value.nameRegisteredOrganization,
        aboutCompany: this.editForm.value.aboutCompany,
        sidmChampionAwards: this.editForm.value.sidmChampionAwards,
        isappreciation: this.editForm.value.isappreciation,
        appreciationDocuments: this.appreciationDocuments,
        campareAchivement: this.editForm.value.campareAchivement,
        mudp: this.editForm.value.mudp,
        productLink: this.editForm.value.productLink,
        exhibit1: this.exhibit1,
        exhibit2: this.exhibit2,
        alterMobileNumber:this.editForm.value.alterMobileNumber,
        alterEmail:this.editForm.value.alterEmail,
        
        status: type,
      }).subscribe(data => {

        let url: string = "/thankYou/" + 'dsfffdsdfdfffffds'
        this.routes.navigateByUrl(url);
        this.toast.success('successfully applied');
      }, err => {
        this.toast.error(err.error);
        this.localStorage.clearLocalStorage();
        window.location.reload()
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
    this.editForm.get('subCategoryDoccument')?.clearValidators()
    this.editForm.get('subCategoryDoccument')?.updateValueAndValidity()
    this.editForm.get('financialDoccument')?.clearValidators()
    this.editForm.get('financialDoccument')?.updateValueAndValidity()
    this.editForm.get('nameOfCompany')?.clearValidators()
    this.editForm.get('nameOfCompany')?.updateValueAndValidity()
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
    this.editForm.get('designation')?.clearValidators()
    this.editForm.get('designation')?.updateValueAndValidity()
    this.editForm.get('gstinOfCompany')?.clearValidators()
    this.editForm.get('gstinOfCompany')?.setValidators(Validators.pattern(/^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/))
    this.editForm.get('gstinOfCompany')?.updateValueAndValidity()
    this.editForm.get('documentGstCertificate')?.clearValidators()
    this.editForm.get('documentGstCertificate')?.updateValueAndValidity()
    this.editForm.get('dateOfCompany')?.clearValidators()
    this.editForm.get('dateOfCompany')?.updateValueAndValidity()
    this.editForm.get('sidmMember')?.clearValidators()
    this.editForm.get('sidmMember')?.updateValueAndValidity()
    this.editForm.get('association')?.clearValidators()
    this.editForm.get('association')?.updateValueAndValidity()
    this.editForm.get('registeredOrganization')?.clearValidators()
    this.editForm.get('registeredOrganization')?.updateValueAndValidity()
    this.editForm.get('aboutCompany')?.clearValidators()
    this.editForm.get('aboutCompany')?.updateValueAndValidity()
    this.editForm.get('sidmChampionAwards')?.clearValidators()
    this.editForm.get('sidmChampionAwards')?.updateValueAndValidity()
    this.editForm.get('isappreciation')?.clearValidators()
    this.editForm.get('isappreciation')?.updateValueAndValidity()
    this.editForm.get('campareAchivement')?.clearValidators()
    this.editForm.get('campareAchivement')?.updateValueAndValidity()
    this.editForm.get('mudp')?.clearValidators()
    this.editForm.get('mudp')?.updateValueAndValidity()
    this.editForm.get('productLink')?.clearValidators()
    this.editForm.get('productLink')?.updateValueAndValidity()
    this.editForm.get('exhibit1')?.clearValidators()
    this.editForm.get('exhibit1')?.updateValueAndValidity()
    this.editForm.get('exhibit2')?.clearValidators()
    this.editForm.get('exhibit2')?.updateValueAndValidity()

    if (this.editForm.valid && this.captcha) {
      this.httpService.updateform(this.editData._id, {
        typeOfApplicant: this.editForm.value.typeOfApplicant,
        subCategoryDoccument: this.subCategoryDoccument,
        financialDoccument: this.financialDoccument,
        nameOfCompany: this.editForm.value.nameOfCompany,
        addressl1: this.editForm.value.addressl1,
        addressl2: this.editForm.value.addressl2,
        state: this.editForm.value.state,
        city: this.editForm.value.city,
        pincode: this.editForm.value.pincode,
        name: this.editForm.value.name,
        designation: this.editForm.value.designation,
        email: this.editForm.value.email,
        mobileNumber: this.editForm.value.mobileNumber,
        panNumber: this.editForm.value.panNumber,
        gstinOfCompany: this.editForm.value.gstinOfCompany,
        documentGstCertificate: this.documentGstCertificate,
        dateOfCompany: this.editForm.value.dateOfCompany,
        sidmMember: this.editForm.value.sidmMember,
        sidmMemberShipNumber: this.editForm.value.sidmMemberShipNumber,
        association: this.editForm.value.association,
        associationName: this.editForm.value.associationName,
        registeredOrganization: this.editForm.value.registeredOrganization,
        nameRegisteredOrganization: this.editForm.value.nameRegisteredOrganization, 
        aboutCompany: this.editForm.value.aboutCompany,
        sidmChampionAwards: this.editForm.value.sidmChampionAwards,
        isappreciation: this.editForm.value.isappreciation,
        appreciationDocuments: this.appreciationDocuments,
        campareAchivement: this.editForm.value.campareAchivement,
        mudp: this.editForm.value.mudp,
        productLink: this.editForm.value.productLink,
        exhibit1: this.exhibit1,
        exhibit2: this.exhibit2,
        alterMobileNumber:this.editForm.value.alterMobileNumber,
        alterEmail:this.editForm.value.alterEmail,
        status: type,

      }).subscribe(data => {
        this.editForm.reset();
        let url: string = "/thankYou/" + 'dsfewfvbvb'
        this.routes.navigateByUrl(url);
        this.toast.success('successfully applied');
      },
        error => {
          this.toast.error('Please Login again');
          this.localStorage.clearLocalStorage()
          window.location.reload()
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

 

  delete(conttrolName: string) {
    if (conttrolName === 'documentGstCertificate') {
      this.documentGstCertificate = null
      this.editForm.get('documentGstCertificate')?.reset()
      this.editForm.get('documentGstCertificate')?.updateValueAndValidity()
      this.editData.documentGstCertificate = null

    }
    else if (conttrolName === 'exhibit1') {
      this.exhibit1 = null;
      this.editForm.get('exhibit1')?.reset()
      this.editForm.get('exhibit1')?.updateValueAndValidity()
      this.editData.exhibit1 = null
    }
    else if (conttrolName === 'exhibit2') {
      this.exhibit2 = null;
      this.editForm.get('exhibit2')?.reset()
      this.editForm.get('exhibit2')?.updateValueAndValidity()
      this.editData.exhibit2 = null
    }
    else if (conttrolName === 'subCategoryDoccument') {
      this.subCategoryDoccument = null;
      this.editForm.get('subCategoryDoccument')?.reset()
      this.editForm.get('subCategoryDoccument')?.updateValueAndValidity()
      this.editData.subCategoryDoccument = null
    }
    else if (conttrolName === 'financialDoccument') {
      this.financialDoccument = null;
      this.editForm.get('financialDoccument')?.reset()
      this.editForm.get('financialDoccument')?.updateValueAndValidity()
      this.editData.financialDoccument = null
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


  logout() {
    this.localStorage.clearLocalStorage()
    window.location.reload()
    this.routes.navigate(['login/member'])

  }

  payNow(id:string){
    this.httpService.paynow(id).subscribe((data:any)=>{
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
  let razorpay_payment_id= response.razorpay_payment_id
  let razorpay_order_id= response.razorpay_order_id
  let createAt = new Date();

  this.httpService.verifypayment({note,razorpay_payment_id,razorpay_order_id,amount,createAt}).subscribe(data=>{
    this.paymentDetails=data
    this.toast.success(' Payment Successfully ');
   let currentRouter = this.routes.url;
    this.routes.navigate([currentRouter])
    window.location.reload();
    
    
  },err=>{
    this.toast.error('Payment failed');

  })
}
else{
  this.toast.error('Payment failed');

}
  }

  receiptClose(type:any){
    if(type==='paymentDetails'){
    this.paymentDetails=null}
    else {
    this.OfflinepaymentDetails=null}
  }

  recipt(OnlinepaymentId:any,OfflineOnlinepaymentId:any){
    this.paymentDetails=null
    this.OfflinepaymentDetails=null
    this.httpService.ViewPayment(OnlinepaymentId).subscribe((data:any)=>{
     
data.createAt  = formatDate(data.createAt , 'MMM d, y,', 'en-US');
   this.paymentDetails=data
      
    },err=>{
      this.toast.error('No Data Found');
    })
    this.httpService.getOflinePayment(OfflineOnlinepaymentId).subscribe((data:any)=>{
      data.createAt  = formatDate(data.createAt , 'MMM d, y, h:mm:ss a', 'en-US');
   this.OfflinepaymentDetails=data
    })
  }


  openDialog(id:any){
    this.submited=false
    const dialogRef = this.dialog.open(ModelComponent, {
      width: '250px',
      data: {id: id,type:'offlinePayment'},
    });


  }
  submitOfflinePaymentDetails(){
   this.submited=true
   if(this.OfflinePayment.valid)
   {
     this.httpService.postOflinePayment({
      registrationId:this.OfflinePayment.value.id,
      dateOfPayment:this.OfflinePayment.value.dateOfPayment,
      amount:this.OfflinePayment.value.amount,
      transactionDetails:this.OfflinePayment.value.transactionDetails,
      modeOfPayment:this.OfflinePayment.value.modeOfPayment,
      nameOfBank:this.OfflinePayment.value.nameOfBank,
     }).subscribe((data:any)=>{
       window.location.reload()
      this.toast.success(data)
     },err=>{
      this.toast.error(err)
      window.location.reload()
     })
   }
   else{
    this.toast.error('Please Fill Required Field');
   }
    
  }
  viewRemark(remark:any){
    this.remark=remark

  }
  closeRemark(){
    this.remark=null;
  }

}
