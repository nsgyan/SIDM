import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: 'memberDashboard',
    loadChildren: () => import(`./memberdashboard/memberdashboard.module`).then(m => m.MemberdashboardModule),
    canActivate: [MemberAuthguradService],
  },
  {
    path: 'adminDashboard',
    loadChildren: () => import(`./admin-dashboard/admin-dashboard.module`).then(m => m.AdminDashboardModule)
  },
  {
    path: 'detail/:id',
    component: ViewpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
