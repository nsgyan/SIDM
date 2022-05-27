import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorModule } from '../app/assessor/assessor.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAuthGuradService } from './shared/services/admin-auth-gurad.service';
import { MemberAuthguradService } from './shared/services/member-authgurad.service';
import { ViewpageComponent } from './viewpage/viewpage.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./registration/registration.module`).then(m => m.RegistrationModule)
  },
  {
    path: 'login',
    loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    component:DashboardComponent,
    loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule),
  },
  {
    path:'assessor',
    loadChildren: () => import('../app/assessor/assessor.module').then(m=>AssessorModule),
    canActivate:[AdminAuthGuradService]
  },
  {
    path: 'detail/:id',
    component: ViewpageComponent,
    canActivate:[AdminAuthGuradService]
  },
  {
    path: '**',
    redirectTo:''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
