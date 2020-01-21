import { Component } from '@angular/core';
import { Order } from 'src/app/stocks/models/order.model';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { OrdersService } from 'src/app/stocks/services/orders/orders.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-show',
  templateUrl: './stock-show.page.html',
  styleUrls: ['./stock-show.page.scss']
})
export class StockShowPage {
  ticker: string;
  orders$: Observable<Order[]>;
  constructor(
    private navCtrl: NavController,
    private ordersService: OrdersService,
    private overlayService: OverlayService,
    private route: ActivatedRoute
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const ticker = this.route.snapshot.paramMap.get(`ticker`);
    if (!ticker) {
      this.overlayService.toast({ message: 'No ID found' });
      this.navCtrl.navigateBack('/stocks');
      return;
    }
    this.ticker = ticker;
    const loading = await this.overlayService.loading();
    try {
      this.orders$ = this.ordersService.getQuery(ref =>
        ref.where('ticker', '==', this.ticker).orderBy('date', 'desc')
      );
    } catch (error) {
      this.overlayService.toast({ message: `Error fetching data: ${error.message}` });
    } finally {
      loading.dismiss();
    }
  }

  onUpdate(order: Order): void {
    this.navCtrl.navigateForward(`/orders/edit/${order.id}`);
  }

  onShow(order: Order): void {
    this.navCtrl.navigateForward(`/orders/show/${order.id}`);
  }

  async onDelete(order: Order): Promise<void> {
    await this.overlayService.alert({
      message: `Delete ${order.ticker}?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.ordersService.delete(order);
            await this.overlayService.toast({ message: `${order.ticker} deleted!` });
          }
        },
        'No'
      ]
    });
  }
}
