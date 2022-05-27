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
      assessorName:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',Validators.required],
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

  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  confirmPassword(event: any,) {
    if (event.target.value !== this.assessorForm.value.password) {
      this.assessorForm.get('confirmPassword')?.setErrors({ confirmPassword: true })
    }
  }


  sumbit(){
    if(this.assessorForm.valid){
      this.httpService.signupAssessor({
        email: this.assessorForm.value.email,
        password: this.assessorForm.value.password,
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
