import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/stocks/services/orders/orders.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from 'src/app/stocks/models/order.model';
import { Stock } from 'src/app/stocks/models/stock.model';
import { StocksService } from 'src/app/stocks/services/stocks/stocks.service';
import { FinanceService } from 'src/app/shared/services/finance.service';

@Component({
  selector: 'app-order-save',
  templateUrl: './order-save.page.html',
  styleUrls: ['./order-save.page.scss']
})
export class OrderSavePage implements OnInit {
  orderForm: FormGroup;
  pageTitle: string;
  orderId: string;
  createdOrder: Order;
  ordersList: Order[];
  stock: Stock = {
    id: null,
    ticker: undefined,
    amount: undefined,
    currentPrice: 0,
    totalCost: undefined,
    currentValue: 0,
    currentProfit: 0,
    monthlyYield: 0,
    label: ''
  };
  sellList: { date: Date; cashFlow: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private stocksService: StocksService,
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private financeService: FinanceService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }

  init(): void {
    const orderId = this.route.snapshot.paramMap.get(`orderid`);
    if (!orderId) {
      this.pageTitle = 'Create Order';
      return;
    }
    this.orderId = orderId;
    this.pageTitle = 'Edit Order';
    this.ordersService
      .get(orderId)
      .pipe(take(1))
      .subscribe(({ ticker, date, type, amount, price, totalFees }) => {
        this.orderForm.get('ticker').setValue(ticker);
        this.orderForm.get('date').setValue(date);
        this.orderForm.get('type').setValue(type);
        this.orderForm.get('amount').setValue(amount);
        this.orderForm.get('price').setValue(price);
        this.orderForm.get('totalFees').setValue(totalFees);
      });
  }
  private createForm(): void {
    this.orderForm = this.fb.group({
      ticker: ['', [Validators.required]],
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      price: ['', [Validators.required]],
      orderTotal: ['', []],
      totalFees: ['', [Validators.required]],
      remainingAmount: ['', []],
      relatedOrders: ['', []],
      profit: ['', []],
      incomeTax: ['', []],
      meanPrice: ['', []],
      yield: ['', []]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const subtotal = this.orderForm.value.amount * this.orderForm.value.price;
      this.calculateOrderTotal(subtotal);
      this.orderForm.value.ticker = this.orderForm.value.ticker.toLocaleUpperCase();
      this.orderForm.value.meanPrice =
        this.orderForm.value.orderTotal / this.orderForm.value.amount;
      this.orderForm.value.remainingAmount = this.orderForm.value.amount;
      this.orderForm.value.relatedOrders = new Array();
      await this.saveOrder();
      if (this.orderForm.value.type === 'V') {
        try {
          await this.calulateSell();
        } catch (error) {
          this.ordersService.delete(this.createdOrder);
          throw error;
        }
      }
      await this.updateStocks();
      this.navCtrl.navigateBack(`/orders/show/${this.createdOrder.id}`);
    } catch (error) {
      this.overlayService.toast({ message: `Error saving order ${error.message}` });
    } finally {
      loading.dismiss();
    }
  }
  async updateStocks(): Promise<void> {
    try {
      this.stocksService
        .getQuery(ref => ref.where('ticker', '==', this.createdOrder.ticker))
        .pipe(take(1))
        .subscribe(async stock => {
          if (stock.length === 0) {
            this.stock.ticker = this.createdOrder.ticker;
            this.stock.amount = this.createdOrder.amount;
            this.stock.totalCost = this.createdOrder.orderTotal;
            const createdStock = await this.stocksService.create(this.stock);
            this.overlayService.toast({ message: `Stock Created: ${createdStock.ticker}` });
          } else {
            if (this.createdOrder.type === 'C') {
              stock[0].amount += this.createdOrder.amount;
              stock[0].totalCost += this.createdOrder.orderTotal;
            } else {
              stock[0].amount -= this.createdOrder.amount;
              stock[0].totalCost -= this.createdOrder.orderTotal - this.createdOrder.profit;
            }
            if (stock[0].amount === 0) {
              await this.stocksService.delete(stock[0]);
              this.overlayService.toast({ message: `Stock Deleted: ${stock[0].ticker}` });
            } else {
              const updatedStock = await this.stocksService.update(stock[0]);
              this.overlayService.toast({ message: `Stock Updated: ${updatedStock.ticker}` });
            }
          }
        });
    } catch (error) {
      throw error;
    }
  }

  async saveOrder(): Promise<Order> {
    try {
      if (!this.orderId) {
        this.createdOrder = await this.ordersService.create(this.orderForm.value);
        this.overlayService.toast({ message: `Order Created: ${this.createdOrder.ticker}` });
      } else {
        this.createdOrder = await this.ordersService.update({
          id: this.orderId,
          ...this.orderForm.value
        });
        this.overlayService.toast({ message: `Order Edited: ${this.createdOrder.ticker}` });
      }
      return this.createdOrder;
    } catch (error) {
      throw error;
    }
  }

  async calulateSell(): Promise<void> {
    this.ordersService
      .getQuery(val =>
        val
          .where('ticker', '==', this.orderForm.value.ticker)
          .where('type', '==', 'C')
          .where('remainingAmount', '>', 0)
      )
      .pipe(take(1))
      .subscribe(async list => {
        this.ordersList = list;
        if (this.ordersList.length > 0) {
          this.ordersList.sort((a, b) => (a.date > b.date ? 1 : -1));
          await this.calculateProfit();
        } else {
          throw new Error('Query returned 0 results');
        }
      });
  }

  async calculateProfit(): Promise<void> {
    const newOrder = new Array();
    let i = 0;
    newOrder[0] = this.createdOrder;
    let remainingSell = newOrder[0].amount;
    let executedSell = 0;
    newOrder[0].profit = 0;
    while (remainingSell > 0) {
      if (this.ordersList[i].remainingAmount > remainingSell) {
        this.ordersList[i].remainingAmount = this.ordersList[i].remainingAmount - remainingSell;
        executedSell = remainingSell;
        remainingSell = 0;
      } else {
        remainingSell = remainingSell - this.ordersList[i].remainingAmount;
        executedSell = this.ordersList[i].remainingAmount;
        this.ordersList[i].remainingAmount = 0;
      }
      this.ordersList[i].relatedOrders.push(newOrder[0].id);
      newOrder[0].profit += (newOrder[0].meanPrice - this.ordersList[i].meanPrice) * executedSell;
      this.sellList.push({
        date: this.ordersList[i].date,
        cashFlow: this.ordersList[i].meanPrice * -executedSell
      });
      try {
        await this.ordersService.update(Object.assign({}, this.ordersList[i]));
        i++;
      } catch (error) {
        throw error;
      }
    }
    this.sellList.push({
      date: newOrder[0].date,
      cashFlow: newOrder[0].orderTotal
    });
    try {
      newOrder[0].yield = this.calculateYield(this.sellList);
      await this.ordersService.update(newOrder[0]);
    } catch (error) {
      throw error;
    }
  }
  calculateYield(sellList: { date: Date; cashFlow: number }[]): number {
    const cfs = [];
    const dates = [];
    sellList.forEach(item => {
      cfs.push(item.cashFlow);
      dates.push(new Date(item.date));
    });
    try {
      return this.financeService.dailyXIRR(cfs, dates);
    } catch (error) {
      throw error;
    }
  }

  calculateOrderTotal(subtotal: number): void {
    if (this.orderForm.value.type === 'C') {
      this.orderForm.value.orderTotal = subtotal + this.orderForm.value.totalFees;
    } else {
      this.orderForm.value.orderTotal = subtotal - this.orderForm.value.totalFees;
    }
  }
}
