import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyNewCategoryComponent } from './apply-new-category/apply-new-category.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';


const routes: Routes = [
  { path: '', component: MemberDashboardComponent },
  { path: 'applyNew', component: ApplyNewCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdashboardRoutingModule { }
