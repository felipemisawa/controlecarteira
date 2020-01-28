import { NgModule } from '@angular/core';
import { DividendsListPageRoutingModule } from './dividends-list-routing.module';
import { DividendsListPage } from './dividends-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [SharedModule, ComponentsModule, DividendsListPageRoutingModule],
  declarations: [DividendsListPage]
})
export class DividendsListPageModule {}
