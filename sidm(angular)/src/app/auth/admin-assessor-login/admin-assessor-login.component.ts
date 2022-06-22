import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-admin-assessor-login',
  templateUrl: './admin-assessor-login.component.html',
  styleUrls: ['./admin-assessor-login.component.css']
})
export class AdminAssessorLoginComponent implements OnInit {
  id:any
  assessorform: FormGroup;
  submitted: boolean = false;
  captcha: any;


  constructor(private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private toast: ToastrService,
    private router: Router,
    private routes: Router,
    private httpService: HttpService) {
      this.localStorage.clearLocalStorage()
      
    this.assessorform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void {
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



  assessorlogin() {
 
    if (this.assessorform.valid) {
      this.httpService.assessorLogin({ email: this.assessorform.value.email, password: this.assessorform.value.password })
        .subscribe((data: any) => {
          this.localStorage.set('token', data.token)
          this.localStorage.set('type', 'assessor')
          this.localStorage.set('name', data.data.assessorName)
          this.localStorage.set('email', data.data.email)
          this.localStorage.set('assessorID', data.data._id)
         this.router.navigate(['/adminAssessor'])
        
      //   this.getassessorData()
      //    const url='/dashboard/assessor/view/'+data.data._id
      //    this.routes.navigateByUrl(url);
      //  window.location.href=url
        this.toast.success('Assessor Successfully login!');
      })
    }

    else {
      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }
  }
  reset() {
    this.assessorform.reset()
    this.submitted = false
  }
  applyNow() {
    this.router.navigate(['/'])
  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }
  getassessorData(){
    this.httpService.getMemberData().
    subscribe((data: any) => {
    this.id=data[0].__id;
      
    let url: string = "/detail/" + data[0].id
    this.routes.navigateByUrl(url);

    }, err => {
      this.toast.error(err.error);
      this.localStorage.clearLocalStorage()
      window.location.reload()
     
    })}
  }



