import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_core/guards/auth.guard';
import { UnauthGuard } from './_core/guards/unauth.guard';

const routes: Routes = [
  {
    path: 'sales-history',
    loadChildren: () => import('./_modules/sales-history/sales-history.module').then(m => m.SalesHistoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sale',
    loadChildren: () => import('./_modules/sale/sale.module').then(m => m.SaleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stock',
    loadChildren: () => import('./_modules/stock/stock.module').then(m => m.StockModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./_modules/login/login.module').then(m => m.LoginModule),
    canActivate: [UnauthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./_modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
