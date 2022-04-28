import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardLayoutComponent } from './admin-dashboard-layout/admin-dashboard-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminEditComponent } from './admin-edit/admin-edit.component';


@NgModule({
  declarations: [
    AdminDashboardLayoutComponent,
    AdminEditComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminDashboardModule { }
