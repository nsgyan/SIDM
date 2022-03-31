import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardLayoutComponent } from './admin-dashboard-layout/admin-dashboard-layout.component';


@NgModule({
  declarations: [
    AdminDashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
