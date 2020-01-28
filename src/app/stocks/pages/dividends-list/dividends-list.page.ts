import { Component } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { Dividend } from '../../models/dividend.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dividends-list',
  templateUrl: './dividends-list.page.html',
  styleUrls: ['./dividends-list.page.scss']
})
export class DividendsListPage {
  // dividends$: Observable<Dividend[]>;
  dividends$: Dividend[] = [];
  constructor(
    private navCtrl: NavController,
    // private ordersService: OrdersService,
    private overlayService: OverlayService
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const test: Dividend = {
        id: '1',
        ticker: 'CSNA3',
        type: 'Dividend',
        amount: 30.03,
        date: new Date(Date.parse(Date()))
      };
      this.dividends$.push(test);
    } catch (error) {
      this.overlayService.toast({ message: `Error fetching data: ${error.message}` });
    } finally {
      loading.dismiss();
    }
  }
}
