import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HistoryComponent } from './history/history.component';
import { PaymentComponent } from './payment/payment.component';
import { UnpaidComponent } from './unpaid/unpaid.component';
import { PaidComponent } from './paid/paid.component';
import { CompletedComponent } from './completed/completed.component';
import { ProductsComponent } from './products/products.component';
import { BranchComponent } from './branch/branch.component';
import { LoginComponent } from './login/login.component';
import { adminAuthGuard } from '../guards/admin-auth.guard';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'dashboard',
    component: AnalyticsComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'branch',
    component: BranchComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'order_details',
    component: HomeComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'product',
    component: ProductsComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [adminAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'unpaid',
        pathMatch: 'full',
      },
      {
        path: 'unpaid',
        component: UnpaidComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'paid',
        component: PaidComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'complete',
        component: CompletedComponent,
        canActivate: [adminAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimRoutingModule {}
