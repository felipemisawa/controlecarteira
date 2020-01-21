import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersListPage } from './orders-list.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'edit/:orderid',
    loadChildren: () => import('./order-save/order-save.module').then(m => m.OrderSavePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show/:orderid',
    loadChildren: () => import('./order-show/order-show.module').then(m => m.OrderShowPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./order-save/order-save.module').then(m => m.OrderSavePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: OrdersListPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersListPageRoutingModule {}
