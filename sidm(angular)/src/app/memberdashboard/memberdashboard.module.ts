import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberdashboardRoutingModule } from './memberdashboard-routing.module';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { LandinigPageModule } from '../landinig-page/landinig-page.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MemberDashboardComponent
  ],
  imports: [
    CommonModule,
    MemberdashboardRoutingModule,
    LandinigPageModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MemberdashboardModule { }
