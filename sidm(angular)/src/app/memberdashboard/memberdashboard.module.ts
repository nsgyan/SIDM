import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdashboardRoutingModule } from './memberdashboard-routing.module';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';


@NgModule({
  declarations: [
    MemberDashboardComponent
  ],
  imports: [
    CommonModule,
    MemberdashboardRoutingModule
  ]
})
export class MemberdashboardModule { }
