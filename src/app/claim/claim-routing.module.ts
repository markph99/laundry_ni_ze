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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: AnalyticsComponent,
  },
  {
    path: 'order_details',
    component: HomeComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
    children: [
      {
        path: '',
        redirectTo: 'unpaid',
        pathMatch: 'full',
      },
      {
        path: 'unpaid',
        component: UnpaidComponent,
      },
      {
        path: 'paid',
        component: PaidComponent,
      },
      {
        path: 'complete',
        component: CompletedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimRoutingModule {}
