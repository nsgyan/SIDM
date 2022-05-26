import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CellNumValidation, panValidation } from 'src/app/shared/services/custom-validator.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-add-assessor',
  templateUrl: './add-assessor.component.html',
  styleUrls: ['./add-assessor.component.css']
})
export class AddAssessorComponent implements OnInit {
  assessorForm:FormGroup
  constructor(private fb:FormBuilder,
    private httpService:HttpService,
    private toast: ToastrService,) { 
    this.assessorForm=this.fb.group({
      assessorCompanyName:['',Validators.required],
      assessorName:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(10), CellNumValidation]],
      panNumber:['',[Validators.required, panValidation]],
    })
  }

  ngOnInit(): void {
  }

  
  checkemail(event: any) {
 
    const email = event.target.value ? event.target.value.toLowerCase() : this.assessorForm.get('email')?.value
    if (email) {
      this.httpService.checkEmail({ email: email })
        .subscribe((data: any) => {
          if (email === data?.email) {
            this.assessorForm.get('email')?.setErrors({ isExist: true });
          }

        })

    }
  }
  checkMobile(event: any) {


    const mobileNumber = event.target.value ? event.target.value : this.assessorForm.get('mobileNumber')?.value
    if (mobileNumber) {
      this.httpService.checkMobile({ mobileNumber: mobileNumber })
        .subscribe((data: any) => {

          if (mobileNumber === data?.mobileNumber) {
            this.assessorForm.get('mobileNumber')?.setErrors({ isExist: true });
          }

        })

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


  sumbit(){
    if(this.assessorForm.valid){
      this.httpService.signupAssessor({
        email: this.assessorForm.value.email,
        mobile: this.assessorForm.value.mobile,
        panNumber:  this.assessorForm.value.panNumber,
        assessorCompanyName: this.assessorForm.value.assessorCompanyName,
        assessorName: this.assessorForm.value.assessorName,
      }).subscribe(data=>{  
        this.toast.success('Assessor  Successfully Added')
      },err=>{
        this.toast.error('Assessor already exist ');
    
      })
    }
    else {
      this.toast.error('Please Fill Required Field');
    }

  }
}
