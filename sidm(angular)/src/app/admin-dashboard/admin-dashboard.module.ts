import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardLayoutComponent } from './admin-dashboard-layout/admin-dashboard-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    AdminDashboardLayoutComponent,
    AdminEditComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
  ]
})
export class AdminDashboardModule { }
