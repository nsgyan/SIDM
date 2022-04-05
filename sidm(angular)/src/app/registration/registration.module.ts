import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { FormheaderComponent } from './formheader/formheader.component';
import { FormfooterComponent } from './formfooter/formfooter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegistrationComponent,
    FormheaderComponent,
    FormfooterComponent,
    ThankYouPageComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    SharedModule
  ]
})
export class RegistrationModule { }
