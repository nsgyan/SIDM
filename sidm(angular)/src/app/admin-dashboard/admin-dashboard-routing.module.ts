import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardLayoutComponent } from './admin-dashboard-layout/admin-dashboard-layout.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

const routes: Routes = [
  { path: '', component: AdminDashboardLayoutComponent ,
},
  { path: 'edit/:id', component:AdminEditComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
