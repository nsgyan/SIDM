import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { LoginFooterComponent } from './login-footer/login-footer.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
