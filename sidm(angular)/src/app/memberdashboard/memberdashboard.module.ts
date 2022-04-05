import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdashboardRoutingModule } from './memberdashboard-routing.module';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberLoginComponent } from './member-login/member-login.component';


@NgModule({
  declarations: [
    MemberDashboardComponent,
    MemberLoginComponent
  ],
  imports: [
    CommonModule,
    MemberdashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MemberdashboardModule { }
