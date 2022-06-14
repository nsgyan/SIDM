import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLogin: FormGroup
  submitted: boolean = false;
  captcha: any;
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private toast: ToastrService,
    private localStorage: LocalStorageService,
    private router: Router) {
      this.localStorage.clearLocalStorage();
    this.adminLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
<<<<<<< HEAD
    if (this.adminLogin.valid&&this.captcha) {
=======
    if (this.adminLogin.valid &&this.captcha) {
>>>>>>> fc00f5ba29ebe04bcea9ee33e07cee20d35c1ddc
    this.httpService.adminlogin({
      'email': this.adminLogin.value.email,
      'password': this.adminLogin.value.password
    }).subscribe((data: any) => {
      this.localStorage.set('token', data.token)
      this.localStorage.set('type', 'admin')
      this.router.navigate(['/dashboard/admin'])
      this.toast.success('Admin Successfully login!');
      this.snackBar.open('Successfully login', 'close', {
        duration: 1500
      })
    }, (err: Error) => {
      this.toast.error('User does not exist');
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

  resolved(captchaResponse: any) {
    this.captcha = captchaResponse;
  }


}
