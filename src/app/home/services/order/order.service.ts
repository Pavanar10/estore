import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import {Order,OrderItem} from '../../types/order.type'
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../users/user-service.service';
import { PastOrder } from '../../types/order.type';
import { PastOrderProduct } from '../../types/order.type';
@Injectable()
export class OrderService {

  constructor(private http:HttpClient,private cartStore:CartStoreItem,private userService:UserService) { }

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<any> {
    const url = 'http://localhost:5001/orders/add';

    const orderDetails: OrderItem[] = [];
    this.cartStore.cart.products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        amount: product.amount,
        qty: product.quantity
      };
      orderDetails.push(orderItem)
    });

    const order: Order = {
      userEmail: userEmail,
      address: deliveryAddress.address,
      userName: deliveryAddress.userName,
      city: deliveryAddress.city,
      pin: deliveryAddress.pin,
      state: deliveryAddress.state,
      total: this.cartStore.cart.totalAmount,
      orderDetails: orderDetails,
    }
    return this.http.post(url, order, {
      headers: { authorization: this.userService.token },
    })
  }

  getOrders(userEmail:string):Observable<PastOrder[]>{
    const url = `http://localhost:5001/orders/allorders?userEmail=${userEmail}`;
    return this.http.get<PastOrder[]>(url,{headers:{authorization:this.userService.token}});
  }

  getOrderProducts(orderId:number):Observable<PastOrderProduct[]>{
    const url = `http://localhost:5001/orders/orderProducts?orderId=${orderId}`;
    return this.http.get<PastOrderProduct[]>(url,{headers:{authorization:this.userService.token}})
  }
}
