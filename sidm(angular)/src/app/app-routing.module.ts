import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./landinig-page/landinig-page.module`).then(m => m.LandinigPageModule)
  },
  {
    path: 'member',
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
