import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import(`./memberdashboard/memberdashboard.module`).then(m => m.MemberdashboardModule)
  },
  {
    path: 'adminDashboard',
    loadChildren: () => import(`./admin-dashboard/admin-dashboard.module`).then(m => m.AdminDashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
