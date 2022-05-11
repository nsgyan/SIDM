import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyNewCategoryComponent } from './apply-new-category/apply-new-category.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';


const routes: Routes = [
  { path: 'view/:id', component: MemberDashboardComponent },
  { path: 'applyNew', component: ApplyNewCategoryComponent },
  { path: 'applyNew', component: ApplyNewCategoryComponent },
  { path: 'questionnaire', component:QuestionnaireFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdashboardRoutingModule { }
