import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberLoginComponent } from './member-login/member-login.component';

const routes: Routes = [
  { path: 'Dashboard', component: MemberDashboardComponent },
  { path: '', component: MemberLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdashboardRoutingModule { }
