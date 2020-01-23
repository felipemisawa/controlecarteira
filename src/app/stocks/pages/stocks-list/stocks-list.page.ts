import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../../models/stock.model';
import { StocksService } from '../../services/stocks/stocks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.page.html',
  styleUrls: ['./stocks-list.page.scss']
})
export class StocksListPage {
  stocks$: Observable<Stock[]>;
  constructor(
    private navCtrl: NavController,
    private stocksService: StocksService,
    private overlayService: OverlayService
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      this.stocks$ = this.stocksService.getAll();
    } catch (error) {
      this.overlayService.toast({ message: `Error fetching data: ${error.message}` });
    } finally {
      loading.dismiss();
    }
  }

  onShow(stock: Stock): void {
    this.navCtrl.navigateForward(`/stocks/show/${stock.ticker}`);
  }
}
