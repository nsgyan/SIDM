
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';


import { ApplyNewCategoryComponent } from './apply-new-category/apply-new-category.component';
import { MemberDashboardPageComponent } from './member-dashboard-page/member-dashboard-page.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';
import { AssessorRemarkComponent } from './assessor-remark/assessor-remark.component';


const routes: Routes = [
  { path: '', component:  MemberDashboardPageComponent},
  { path: 'view/:id', component: MemberDashboardComponent },
  { path: 'applyNewCategory', component: ApplyNewCategoryComponent },
  { path: 'applyNew', component: ApplyNewCategoryComponent },
  { path: 'questionnaire/:id', component:QuestionnaireFormComponent },
  { path: 'viewQuestionnaire/:id', component:ViewQuestionnaireComponent },
  {path:'editQuestionnaire/:id',component:EditQuestionnaireComponent},
  {path:'assessorRemark/:id',component:AssessorRemarkComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberdashboardRoutingModule { }
