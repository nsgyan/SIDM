import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatTableExporterModule } from 'mat-table-exporter';
import { ListViewComponent } from './list-view/list-view.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AdminEditComponent,
    ListViewComponent,
    AdminDashboardComponent,
    QuestionnaireComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
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
    MatIconModule
    
  
  ]
})
export class AdminDashboardModule { }
