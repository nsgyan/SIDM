import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  myForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService) {
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

    })

  }

}
