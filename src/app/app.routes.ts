import { Routes } from '@angular/router';
import { ContentRoutingModule } from './content/content-routing.module';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./content/content-routing.module').then((m) =>m.ContentRoutingModule)
  },
];
