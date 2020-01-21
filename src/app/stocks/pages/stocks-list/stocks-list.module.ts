import { NgModule } from '@angular/core';
import { StocksListPageRoutingModule } from './stocks-list-routing.module';

import { StocksListPage } from './stocks-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [SharedModule, ComponentsModule, StocksListPageRoutingModule],
  declarations: [StocksListPage]
})
export class StocksListPageModule {}
