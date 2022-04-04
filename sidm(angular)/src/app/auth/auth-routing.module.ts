import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: 'adminLogin', component: AdminLoginComponent },
  { path: 'thankYou', component: ThankyouPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
