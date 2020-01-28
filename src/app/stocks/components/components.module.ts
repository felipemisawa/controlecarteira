import { NgModule } from '@angular/core';
import { OrderItemComponent } from './order-item/order-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockItemComponent } from './stock-item/stock-item.component';
import { DividendItemComponent } from './dividend-item/dividend-item.component';

@NgModule({
  declarations: [OrderItemComponent, StockItemComponent, DividendItemComponent],
  imports: [SharedModule],
  exports: [OrderItemComponent, StockItemComponent, DividendItemComponent]
})
export class ComponentsModule {}
