import { Routes } from '@angular/router';
import { ContentRoutingModule } from './content/content-routing.module';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./content/content-routing.module').then((m) =>m.ContentRoutingModule)
  },
  {
    path: 'job_order',
    loadChildren: () => import('./add-slip/add-slip-routing.module').then((m) =>m.AddSlipRoutingModule)
  },
  {
    path: 'claim',
    loadChildren: () => import('./claim/claim-routing.module').then((m) =>m.ClaimRoutingModule)
  },
];
