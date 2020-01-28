import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DividendsListPage } from './dividends-list.page';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DividendsListPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DividendsListPageRoutingModule {}
