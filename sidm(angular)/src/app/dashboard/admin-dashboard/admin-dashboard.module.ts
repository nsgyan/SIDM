
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { RecaptchaModule } from 'ng-recaptcha';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ListViewComponent } from './list-view/list-view.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { ApplicantQuestionnaireComponent } from './applicant-questionnaire/applicant-questionnaire.component';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplicantFormViewComponent } from './applicant-form-view/applicant-form-view.component';
import { AddAssessorComponent } from './add-assessor/add-assessor.component';
import { AssessorListComponent } from './assessor-list/assessor-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssessorQuestionnaireComponent } from './assessor-questionnaire/assessor-questionnaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';




@NgModule({
  declarations: [
    AdminEditComponent,
    ListViewComponent,
    QuestionnaireComponent,
    QuestionnaireListComponent,
    EditQuestionnaireComponent,
    ViewQuestionnaireComponent,
    ApplicantQuestionnaireComponent,
    ApplicantFormViewComponent,
    AddAssessorComponent,
    AssessorListComponent,
    AssessorQuestionnaireComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
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
    CKEditorModule

    
  
  ]
})
export class AdminDashboardModule { }
