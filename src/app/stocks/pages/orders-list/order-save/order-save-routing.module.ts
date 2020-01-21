import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSavePage } from './order-save.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderSavePage,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSavePageRoutingModule {}
