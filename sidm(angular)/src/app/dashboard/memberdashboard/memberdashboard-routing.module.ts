import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyNewCategoryComponent } from './apply-new-category/apply-new-category.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';


const routes: Routes = [
  { path: 'view/:id', component: MemberDashboardComponent },
  { path: '', component: ApplyNewCategoryComponent },
  { path: 'applyNew', component: ApplyNewCategoryComponent },
  { path: 'questionnaire/:id', component:QuestionnaireFormComponent },
  { path: 'viewQuestionnaire/:id', component:ViewQuestionnaireComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdashboardRoutingModule { }
