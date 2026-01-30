import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CombinedViewComponent } from './components/combined-view/combined-view.component';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'combined', component: CombinedViewComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
