

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuradService } from '../shared/services/admin-auth-gurad.service';

const routes: Routes = [

  {
    path: 'admin',
    loadChildren: () => import(`../dashboard/admin-dashboard/admin-dashboard.module`).then(m => m.AdminDashboardModule),
    canActivate:[AdminAuthGuradService]
  },
  {
    path: 'member',
    loadChildren: () => import(`../dashboard/memberdashboard/memberdashboard.module`).then(m => m.MemberdashboardModule),
    canActivate:[AdminAuthGuradService]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
