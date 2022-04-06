import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation, panValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {
  appreciationDocuments: any;
  scanDocument: any;
  documentsOfProduct: any;
  documentGstCertificate: any;
  userId: any

  newCategory = false
  newCategoryForm!: FormGroup;
  cat1 = true
  cat2 = true
  cat3 = true
  cat4 = true
  memberData: any
  submitted: boolean = true;
  captcha: any;
  states: any;
  constructor(private localStroage: LocalStorageService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private httpService: HttpService) {
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
          mobileNumber: [''],
          email: [this.memberData?.email],
          sidmMemberShipNumber: [''],
          otherAssociationMemberShipNumber: [''],
          panNumberOfOrganization: [''],
          gstinOfOrganization: [''],
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
          awardMatterToCompany: ['']

        })
      })
  }

  ngOnInit(): void {



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

  changeListener($event: any, form: any) {
    console.log($event);

    this.readThis($event.target, form);


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
    if (this.newCategoryForm.valid) {
    // this.httpService.applyNewCategory(this.userId, {
    //   category: this.newCategoryForm.value.category,
    //   nameOfOrganisation: this.newCategoryForm.value.nameOfOrganisation,
    //   addressl1: this.newCategoryForm.value.addressl1,
    //   addressl2: this.newCategoryForm.value.addressl2,
    //   state: this.newCategoryForm.value.state,
    //   city: this.newCategoryForm.value.city,
    //   pincode: this.newCategoryForm.value.pincode,
    //   name: this.newCategoryForm.value.name,
    //   designation: this.newCategoryForm.value.designation,
    //   mobileNumber: this.newCategoryForm.value.mobileNumber,
    //   email: this.newCategoryForm.value.email,
    //   sidmMemberShipNumber: this.newCategoryForm.value.sidmMemberShipNumber,
    //   otherAssociationMemberShipNumber: this.newCategoryForm.value.otherAssociationMemberShipNumber,
    //   panNumberOfOrganization: this.newCategoryForm.value.panNumberOfOrganization,
    //   gstinOfOrganization: this.newCategoryForm.value.gstinOfOrganization,
    //   dateOfOrganization: this.newCategoryForm.value.dateOfOrganization,
    //   financialStatement1: this.newCategoryForm.value.financialStatement1,
    //   financialStatement2: this.newCategoryForm.value.financialStatement2,
    //   financialStatement3: this.newCategoryForm.value.financialStatement2,
    //   aboutCompany: this.newCategoryForm.value.financialStatement3,
    //   achievementsToJustifyApplication: this.newCategoryForm.value.achievementsToJustifyApplication,
    //   campareAchivement: this.newCategoryForm.value.campareAchivement,
    //   documentGstCertificate: this.documentGstCertificate,
    //   documentsOfProduct: this.documentsOfProduct,
    //   appreciationDocuments: this.appreciationDocuments,
    //   briefCompany: this.newCategoryForm.value.briefCompany,

    // }).subscribe(data => {
    //   this.newCategory = false
    //   this.httpService.getMemberData(this.userId).
    //     subscribe((data: any) => {
    //       this.toast.success(' Successfully Applied New category');
    //       data?.category?.map((item: any) => {
    //         if (item.category === 'cat1') {
    //           this.cat1 = false
    //           item.category = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
    //         }
    //         else if (item.category === 'cat2') {
    //           this.cat2 = false
    //           item.category = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
    //         }
    //         else if (item.category === 'cat3') {
    //           this.cat3 = false
    //           item.category = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
    //         }
    //         else if (item.category === 'cat4') {
    //           this.cat4 = false
    //           item.category = 'C4- Export Performance of Defence & Aerospace Products'
    //         }
    //       })
    //       this.memberData = data;
    //       this.newCategoryForm = this.formBuilder.group({
    //         category: ['', Validators.required],
    //         typeOfApplicant: [''],
    //         nameOfOrganisation: [''],
    //         addressl1: [''],
    //         addressl2: [''],
    //         state: [''],
    //         city: [''],
    //         pincode: ['', [Validators.pattern('^[1-9][0-9]{5}$')]],
    //         name: [''],
    //         designation: [''],
    //         mobileNumber: ['', [Validators.required, CellNumValidation]],
    //         email: ['', [Validators.required, Validators.email]],
    //         sidmMemberShipNumber: [''],
    //         otherAssociationMemberShipNumber: [''],
    //         panNumberOfOrganization: ['', [Validators.required, panValidation]],
    //         gstinOfOrganization: [''],
    //         dateOfOrganization: [''],
    //         vendorOrganization1: [''],
    //         vendorOrganization2: [''],
    //         vendorOrganization3: [''],
    //         vendorOrganization4: [''],
    //         aboutCompany: [''],
    //         achievementsToJustifyApplication: [''],
    //         campareAchivement: [''],
    //         documentGstCertificate: [''],
    //         documentsOfProduct: [''],
    //         appreciationDocuments: [''],
    //         briefCompany: [''],
    //         awardMatterToCompany: ['']


    //       })
    //     })


    //   // this.toastr.success('successfully applied');
    // })
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
    this.newCategory = true

  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }

}
