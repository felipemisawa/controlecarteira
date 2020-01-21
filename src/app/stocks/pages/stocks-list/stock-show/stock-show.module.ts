import { NgModule } from '@angular/core';
import { StockShowPageRoutingModule } from './stock-show-routing.module';
import { StockShowPage } from './stock-show.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/stocks/components/components.module';

@NgModule({
  imports: [SharedModule, ComponentsModule, StockShowPageRoutingModule],
  declarations: [StockShowPage]
})
export class StockShowPageModule {}
