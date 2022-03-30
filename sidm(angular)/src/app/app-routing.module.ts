import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./landinig-page/landinig-page.module`).then(m => m.LandinigPageModule)
  },
  {
    path: 'memberDashboard',
    loadChildren: () => import(`./memberdashboard/memberdashboard.module`).then(m => m.MemberdashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
