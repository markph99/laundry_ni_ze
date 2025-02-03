import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { userAuthGuard } from '../guards/user-auth.guard';
import { ClaimComponent } from './claim/claim.component';
import { JobOrdComponent } from './job-ord/job-ord.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'order',
    component: JobOrdComponent
  },
  {
    path: 'claim',
    component: ClaimComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSlipRoutingModule {}
