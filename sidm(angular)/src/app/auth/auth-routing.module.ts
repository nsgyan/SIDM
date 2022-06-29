import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAssessorLoginComponent } from './admin-assessor-login/admin-assessor-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AssessorLoginComponent } from './assessor-login/assessor-login.component';
import { MemberLoginComponent } from './member-login/member-login.component';

const routes: Routes = [
  { path: 'admin', component: AdminLoginComponent },
  { path: 'member', component: MemberLoginComponent },
  // { path: 'assessor', component: AssessorLoginComponent },
  // { path: 'adminAssessor', component: AdminAssessorLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
