import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { LoginFooterComponent } from './login-footer/login-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    SignUpComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgxSpinnerModule,

  ]
})
export class AuthModule { }
