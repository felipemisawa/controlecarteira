import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersListPageRoutingModule } from './orders-list-routing.module';

import { OrdersListPage } from './orders-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [SharedModule, ComponentsModule, OrdersListPageRoutingModule],
  declarations: [OrdersListPage]
})
export class OrdersListPageModule {}
