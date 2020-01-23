import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/stocks/services/orders/orders.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from 'src/app/stocks/models/order.model';
import { FinanceService } from 'src/app/shared/services/finance.service';

@Component({
  selector: 'app-order-show',
  templateUrl: './order-show.page.html',
  styleUrls: ['./order-show.page.scss']
})
export class OrderShowPage implements OnInit {
  orderId: string;
  orderData: Order;

  constructor(
    private ordersService: OrdersService,
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private finance: FinanceService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init(): Promise<void> {
    const orderId = this.route.snapshot.paramMap.get(`orderid`);
    const nums = [-1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5000];
    // const nums = [-1000, 0, 0, -500, 100000];
    console.log(this.finance.IRR(nums));
    if (!orderId) {
      this.overlayService.toast({ message: 'No ID found' });
      this.navCtrl.navigateBack('/orders');
      return;
    }
    this.orderId = orderId;
    const loading = await this.overlayService.loading();
    try {
      this.orderData = await this.getData(orderId);
    } catch (error) {
      this.overlayService.toast({ message: `Error fetching order: ${error.message}` });
      this.navCtrl.navigateBack('/orders');
    } finally {
      loading.dismiss();
    }
  }

  private getData(orderId: string): Promise<Order> {
    return this.ordersService
      .get(orderId)
      .pipe(take(1))
      .toPromise();
  }
}
