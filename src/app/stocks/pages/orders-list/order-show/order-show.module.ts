import { NgModule } from '@angular/core';

import { OrderShowPageRoutingModule } from './order-show-routing.module';

import { OrderShowPage } from './order-show.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/stocks/components/components.module';

@NgModule({
  imports: [SharedModule, OrderShowPageRoutingModule, ComponentsModule],
  declarations: [OrderShowPage]
})
export class OrderShowPageModule {}
