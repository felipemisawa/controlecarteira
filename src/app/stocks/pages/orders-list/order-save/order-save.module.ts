import { NgModule } from '@angular/core';

import { OrderSavePageRoutingModule } from './order-save-routing.module';

import { OrderSavePage } from './order-save.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/stocks/components/components.module';

@NgModule({
  imports: [SharedModule, OrderSavePageRoutingModule, ComponentsModule],
  declarations: [OrderSavePage]
})
export class OrderSavePageModule {}
