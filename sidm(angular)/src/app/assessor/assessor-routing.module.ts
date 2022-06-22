import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { AssessorDashboardComponent } from './assessor-dashboard/assessor-dashboard.component';
import { ViewApplicantComponent } from './view-applicant/view-applicant.component';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';

const routes: Routes = [
  {path:'',component:AssessorDashboardComponent},
  {
  path :"applicantList",
  component:ApplicantListComponent
  },
  {path:'ViewApplicantQuestionnaire/:id',component:ViewQuestionnaireComponent},
  { path: 'applicantForm/:id',component:ViewApplicantComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorRoutingModule { }
