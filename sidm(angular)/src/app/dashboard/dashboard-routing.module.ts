import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessorModule } from '../dashboard/assessor/assessor.module';
import { AdminAuthGuradService } from '../shared/services/admin-auth-gurad.service';

const routes: Routes = [
  {
    path: 'member',
    loadChildren: () => import(`../dashboard/memberdashboard/memberdashboard.module`).then(m => m.MemberdashboardModule),
    canActivate:[AdminAuthGuradService]
  },
  {
    path: 'admin',
    loadChildren: () => import(`../dashboard/admin-dashboard/admin-dashboard.module`).then(m => m.AdminDashboardModule),
    canActivate:[AdminAuthGuradService]
  },
  {
    path:'assessor',
    loadChildren: () => import(`../dashboard/assessor/assessor.module`).then(m=>AssessorModule),
    canActivate:[AdminAuthGuradService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
