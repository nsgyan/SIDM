import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAssessorRoutingModule } from './admin-assessor-routing.module';
import { AdminAssessorDashBoardComponent } from './admin-assessor-dash-board/admin-assessor-dash-board.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatTableExporterModule } from 'mat-table-exporter';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ApplicantQuestionnaireComponent } from './applicant-questionnaire/applicant-questionnaire.component';
import { ViewAssessmentComponent } from './view-assessment/view-assessment.component';


@NgModule({
  declarations: [
    AdminAssessorDashBoardComponent,
    ApplicantListComponent,
    ApplicantQuestionnaireComponent,
    ViewAssessmentComponent
  ],
  imports: [
    CommonModule,
    AdminAssessorRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatTableExporterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule ,
    MatIconModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    SharedModule,
    MatStepperModule,
    CKEditorModule

  ]
})
export class AdminAssessorModule { }
