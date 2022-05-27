import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssessorComponent } from './add-assessor/add-assessor.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { ApplicantFormViewComponent } from './applicant-form-view/applicant-form-view.component';
import { ApplicantQuestionnaireComponent } from './applicant-questionnaire/applicant-questionnaire.component';
import { AssessorListComponent } from './assessor-list/assessor-list.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { ListViewComponent } from './list-view/list-view.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';

const routes: Routes = [
  { path: '', component: ListViewComponent ,
},
  { path: 'edit/:id', component:AdminEditComponent },
  { path: 'add/assessor', component:AddAssessorComponent },
  { path: 'assessor', component:AssessorListComponent },
  { path: 'questionnaire', component:QuestionnaireComponent },
  { path: 'questionnaireList', component:QuestionnaireListComponent },
  { path: 'questionnaireList/edit/:id', component:EditQuestionnaireComponent },
  { path: 'viewQuestionnaire/:id', component:ViewQuestionnaireComponent },
  {path:'ViewApplicantQuestionnaire/:id',component:ApplicantQuestionnaireComponent},
  { path: 'applicantForm/:id',component:ApplicantFormViewComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
