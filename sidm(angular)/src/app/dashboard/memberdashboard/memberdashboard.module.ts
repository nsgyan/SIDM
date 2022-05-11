import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdashboardRoutingModule } from './memberdashboard-routing.module';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplyNewCategoryComponent } from './apply-new-category/apply-new-category.component';


@NgModule({
  declarations: [
    MemberDashboardComponent,
    ApplyNewCategoryComponent,
  ],
  imports: [
    CommonModule,
    MemberdashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    SharedModule
  ]
})
export class MemberdashboardModule { }
