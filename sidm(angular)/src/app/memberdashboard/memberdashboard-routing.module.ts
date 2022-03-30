import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';

const routes: Routes = [
  { path: '', component: MemberDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdashboardRoutingModule { }
