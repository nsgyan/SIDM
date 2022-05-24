import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdashboardRoutingModule } from './memberdashboard-routing.module';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';
import { ApplyNewCategoryComponent } from './apply-new-category/apply-new-category.component';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    MemberDashboardComponent,
    ApplyNewCategoryComponent,
    QuestionnaireFormComponent,
    ViewQuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    MemberdashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    SharedModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    
    
  ]
})
export class MemberdashboardModule { }
