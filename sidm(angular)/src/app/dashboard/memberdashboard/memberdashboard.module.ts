
import { CommonModule } from '@angular/common';
import { MemberdashboardRoutingModule } from './memberdashboard-routing.module';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaModule } from 'ng-recaptcha';
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
import { CKEditorModule } from 'ckeditor4-angular';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MemberDashboardPageComponent } from './member-dashboard-page/member-dashboard-page.component';


@NgModule({
  declarations: [
    MemberDashboardComponent,
    ApplyNewCategoryComponent,
    QuestionnaireFormComponent,
    ViewQuestionnaireComponent,
    MemberDashboardPageComponent,
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
    CKEditorModule

    
  ]
})
export class MemberdashboardModule { }
