import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { OrdersService } from '../../services/orders/orders.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss']
})
export class OrdersListPage {
  orders$: Observable<Order[]>;
  constructor(
    private navCtrl: NavController,
    private ordersService: OrdersService,
    private overlayService: OverlayService
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      this.orders$ = this.ordersService.getAll();
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
