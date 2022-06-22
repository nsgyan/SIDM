import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAssessorDashBoardComponent } from './admin-assessor-dash-board/admin-assessor-dash-board.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ApplicantQuestionnaireComponent } from './applicant-questionnaire/applicant-questionnaire.component';
import { ViewAssessmentComponent } from './view-assessment/view-assessment.component';

const routes: Routes = [ {path:'',component:AdminAssessorDashBoardComponent},
{
path :"applicantList",
component:ApplicantListComponent
},
{path:'applicantQuestionnaire/:id',component:ApplicantQuestionnaireComponent},
{
  path:"assessorQuestionnaire",component:ViewAssessmentComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAssessorRoutingModule { }
