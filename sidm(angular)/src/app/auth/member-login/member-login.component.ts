import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "src/app/shared/services/http.service";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.css']
})
export class MemberLoginComponent implements OnInit {
id:any
  memberform: FormGroup;
  submitted: boolean = false;
  captcha: any;


  constructor(private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private toast: ToastrService,
    private router: Router,
    private routes: Router,
    private httpService: HttpService) {
      this.localStorage.clearLocalStorage()

    this.memberform = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
      email: ['', Validators.required],
      panNumber: ['', Validators.required],
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



  memberlogin() {

    this.memberform.value.panNumber = this.memberform.value.panNumber.toUpperCase()
 
    if (this.memberform.valid) {
      this.httpService.memberlogin({ email: this.memberform.value.email, mobileNumber: this.memberform.value.mobileNumber, panNumber: this.memberform.value.panNumber })
        .subscribe((data: any) => {
          this.localStorage.set('token', data.token)
          this.localStorage.set('type', 'member')
        //  this.router.navigate(['/dashboard/member'])
        
      //   this.getmemberData()
         const url='/dashboard/member'
         this.routes.navigateByUrl(url);
       window.location.href=url
        this.toast.success('Member Successfully login!');
      }, err => {
        this.toast.error('Please Provide Valid Email Mobile Number And Pan Number');
      })
    }
    else if (!this.captcha) {
      this.submitted = true;
      this.toast.error('Please verify that you are not a robot.');
    }
    else {
      this.submitted = true;
      this.toast.error('Please Fill Required Field');
    }
  }
  reset() {
    this.memberform.reset()
    this.submitted = false
  }
  applyNow() {
    this.router.navigate(['/'])
  }

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }
  getmemberData(){
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



