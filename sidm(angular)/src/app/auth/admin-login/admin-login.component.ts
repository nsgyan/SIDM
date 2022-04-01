import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  myForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.myForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.httpService.adminlogin({
      'email': this.myForm.value.email,
      'password': this.myForm.value.password
    }).subscribe(data => {
      console.log(data);
      this.router.navigate(['/adminDashboard'])
      // this._snackBar.open('sucessfully login', 'Done');
      this.snackBar.open('Successfully login', 'close', {
        duration: 1500
      })
    }, (err: Error) => {
      console.log(err);
      // this._snackBar.open('User does not exist', 'Done');

    })

  }

}
