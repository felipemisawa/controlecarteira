import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StocksListPage } from './stocks-list.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'show/:ticker',
    loadChildren: () => import('./stock-show/stock-show.module').then(m => m.StockShowPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: StocksListPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'stock-show',
    loadChildren: () => import('./stock-show/stock-show.module').then(m => m.StockShowPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksListPageRoutingModule {}
