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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';



@NgModule({
  declarations: [
    SignUpComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
    AdminLoginComponent,
    ThankyouPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgxSpinnerModule,
    MatSnackBarModule

  ],
  exports: [LoginHeaderComponent,
    LoginFooterComponent,]
})
export class AuthModule { }
