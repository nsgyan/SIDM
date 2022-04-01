import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdashboardRoutingModule } from './memberdashboard-routing.module';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { LandinigPageModule } from '../landinig-page/landinig-page.module';


@NgModule({
  declarations: [
    MemberDashboardComponent
  ],
  imports: [
    CommonModule,
    MemberdashboardRoutingModule,
    LandinigPageModule
  ]
})
export class MemberdashboardModule { }
