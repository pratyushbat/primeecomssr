import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  loading = true;
  orders: any[] = [];

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.allOrders().subscribe({
      next: (data: any) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.orders = [];
        this.loading = false;
      }
    });
  }

  badgeClasses(status: any) {
    switch (status) {
      case 'success':
        return 'tw-bg-green-100 tw-text-green-700';
      case 'pending':
        return 'tw-bg-yellow-100 tw-text-yellow-700';
      case 'failed':
        return 'tw-bg-red-100 tw-text-red-700';
      default:
        return 'tw-bg-gray-100 tw-text-gray-700';
    }
  }
}
export type OrderStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

/* export interface Order {
  orderId: string;
  createdAt: string; // ISO date
  amount: number;
  paymentMethod: 'PHONEPE' | 'COD' | 'CARD';
  status: OrderStatus;
} */