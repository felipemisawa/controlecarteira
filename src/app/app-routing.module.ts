import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'stocks',
    loadChildren: './stocks/modules/stocks-module/stocks.module#StocksModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: './stocks/modules/orders-module/orders.module#OrdersModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'dividends',
    loadChildren: () =>
      import('./stocks/pages/dividends-list/dividends-list.module').then(
        m => m.DividendsListPageModule
      ),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
