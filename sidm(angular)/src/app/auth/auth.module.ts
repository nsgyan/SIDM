import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MemberLoginComponent } from './member-login/member-login.component';
import { SharedModule } from '../shared/shared.module';
import { AssessorLoginComponent } from './assessor-login/assessor-login.component';
import { AdminAssessorLoginComponent } from './admin-assessor-login/admin-assessor-login.component';
import { FinalJuryComponent } from './final-jury/final-jury.component';



@NgModule({
  declarations: [
    AdminLoginComponent,
    MemberLoginComponent,
    AssessorLoginComponent,
    AdminAssessorLoginComponent,
    FinalJuryComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    SharedModule

  ]
})
export class AuthModule { }
