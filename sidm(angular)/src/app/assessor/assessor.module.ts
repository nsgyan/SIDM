import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessorRoutingModule } from './assessor-routing.module';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
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
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableExporterModule } from 'mat-table-exporter';
import { RecaptchaModule } from 'ng-recaptcha';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';
import { AssessorDashboardComponent } from './assessor-dashboard/assessor-dashboard.component';
import { AssessorHeaderComponent } from './assessor-header/assessor-header.component';


@NgModule({
  declarations: [
    ApplicantListComponent,
    ViewQuestionnaireComponent,
    AssessorDashboardComponent,
    AssessorHeaderComponent
  ],
  imports: [
    CommonModule,
    AssessorRoutingModule,
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
    MatDialogModule
    
  ]
})
export class AssessorModule { }
