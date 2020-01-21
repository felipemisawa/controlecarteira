import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockShowPage } from './stock-show.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: StockShowPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockShowPageRoutingModule {}
