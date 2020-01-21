import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
  @Input() order: Order;
  @Output() delete = new EventEmitter<Order>();
  @Output() update = new EventEmitter<Order>();
  @Output() show = new EventEmitter<Order>();
}
