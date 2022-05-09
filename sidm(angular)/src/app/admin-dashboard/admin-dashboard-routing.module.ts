import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardLayoutComponent } from './admin-dashboard-layout/admin-dashboard-layout.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  { path: '', component: ListViewComponent ,
},
  { path: 'edit/:id', component:AdminEditComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
