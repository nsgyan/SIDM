import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private localStroage: LocalStorageService,
    private formBuilder: FormBuilder,
    private httpService: HttpService) {
    this.userId = this.localStroage.get('memberUserID')
    this.httpService.getMemberData(this.userId).
      subscribe((data: any) => {
        data?.category?.map((item: any) => {
          if (item.type === 'cat1') {
            this.cat1 = false
            item.type = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
          }
          else if (item.type === 'cat2') {
            this.cat2 = false
            item.type = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
          }
          else if (item.type === 'cat3') {
            this.cat3 = false
            item.type = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
          }
          else if (item.type === 'cat4') {
            this.cat4 = false
            item.type = 'C4- Export Performance of Defence & Aerospace Products'
          }
        })
        this.memberData = data;
        console.log(this.memberData);
        this.newCategoryForm = this.formBuilder.group({
          category: ['', Validators.required],
          typeOfApplicant: ['', Validators.required],
          nameOfOrganisation: ['', Validators.required],
          addressl1: [this.memberData?.addressl1, Validators.required],
          addressl2: [this.memberData?.addressl2],
          state: [this.memberData?.state, Validators.required],
          city: [this.memberData?.city, Validators.required],
          pincode: [this.memberData?.pincode, Validators.required],
          name: [this.memberData?.name, Validators.required],
          designation: [this.memberData?.designation],
          mobileNumber: [this.memberData?.mobileNumber, [Validators.required, CellNumValidation]],
          email: [this.memberData?.email, Validators.required],
          sidmMemberShipNumber: [''],
          otherAssociationMemberShipNumber: [''],
          panNumberOfOrganization: [this.memberData?.panNumberOfOrganization, [Validators.required, panValidation]],
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
    this.httpService.applyNewCategory(this.userId, {
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
      financialStatement1: this.newCategoryForm.value.financialStatement1,
      financialStatement2: this.newCategoryForm.value.financialStatement2,
      financialStatement3: this.newCategoryForm.value.financialStatement2,
      aboutCompany: this.newCategoryForm.value.financialStatement3,
      achievementsToJustifyApplication: this.newCategoryForm.value.achievementsToJustifyApplication,
      campareAchivement: this.newCategoryForm.value.campareAchivement,
      documentGstCertificate: this.documentGstCertificate,
      documentsOfProduct: this.documentsOfProduct,
      appreciationDocuments: this.appreciationDocuments,
      briefCompany: this.newCategoryForm.value.briefCompany,

    }).subscribe(data => {
      console.log(data);

      this.newCategory = false
      this.httpService.getMemberData(this.userId).
        subscribe((data: any) => {
          data?.category?.map((item: any) => {
            if (item.type === 'cat1') {
              this.cat1 = false
              item.type = 'C1- Technology /  Product Innovation to address Defence Capability Gaps'
            }
            else if (item.type === 'cat2') {
              this.cat2 = false
              item.type = 'C2-Import Substitution for Mission Critical Parts / Sub-Systems / Systems'
            }
            else if (item.type === 'cat3') {
              this.cat3 = false
              item.type = 'C3-  Creation of   Niche, Technological Capability for Design, Manufacturing or Testing'
            }
            else if (item.type === 'cat4') {
              this.cat4 = false
              item.type = 'C4- Export Performance of Defence & Aerospace Products'
            }
          })
          this.memberData = data;
          console.log(this.memberData);
          this.newCategoryForm = this.formBuilder.group({
            category: ['', Validators.required],
            typeOfApplicant: ['', Validators.required],
            nameOfOrganisation: ['', Validators.required],
            addressl1: [this.memberData?.addressl1, Validators.required],
            addressl2: [this.memberData?.addressl2],
            state: [this.memberData?.state, Validators.required],
            city: [this.memberData?.city, Validators.required],
            pincode: [this.memberData?.pincode, Validators.required],
            name: [this.memberData?.name, Validators.required],
            designation: [this.memberData?.designation],
            mobileNumber: [this.memberData?.mobileNumber, [Validators.required, CellNumValidation]],
            email: [this.memberData?.email, Validators.required],
            sidmMemberShipNumber: [''],
            otherAssociationMemberShipNumber: [''],
            panNumberOfOrganization: [this.memberData?.panNumberOfOrganization, [Validators.required, panValidation]],
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
        })


      // this.toastr.success('successfully applied');
    })

  }

  applyNew() {
    this.newCategory = true

  }

}
