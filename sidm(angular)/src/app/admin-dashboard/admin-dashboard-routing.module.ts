import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { EditQuestionnaireComponent } from './edit-questionnaire/edit-questionnaire.component';
import { ListViewComponent } from './list-view/list-view.component';
import { QuestionnaireListComponent } from './questionnaire-list/questionnaire-list.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

const routes: Routes = [
  { path: '', component: ListViewComponent ,
},
  { path: 'edit/:id', component:AdminEditComponent },
  { path: 'questionnaire', component:QuestionnaireComponent },
  { path: 'questionnaireList', component:QuestionnaireListComponent },
  { path: 'questionnaireList/edit/:id', component:EditQuestionnaireComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
