import { NgModule } from '@angular/core';
import { OrderItemComponent } from './order-item/order-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StockItemComponent } from './stock-item/stock-item.component';

@NgModule({
  declarations: [OrderItemComponent, StockItemComponent],
  imports: [SharedModule],
  exports: [OrderItemComponent, StockItemComponent]
})
export class ComponentsModule {}
