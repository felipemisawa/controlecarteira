import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderShowPage } from './order-show.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderShowPage,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderShowPageRoutingModule { }
