import { Component } from '@angular/core';
import { PastOrder } from '../../types/order.type';
import { PastOrderProduct } from '../../types/order.type';
import { OnInit,OnDestroy } from '@angular/core';
import { UserService } from '../../services/users/user-service.service';
import { OrderService } from '../../services/order/order.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-pastorders',
  templateUrl: './pastorders.component.html',
  styleUrls: ['./pastorders.component.scss']
})
export class PastordersComponent implements OnInit,OnDestroy {
  pastOrderProducts:PastOrderProduct[]=[];

  pastOrder:PastOrder;
  pastOrders:PastOrder[]=[];
  subscriptions:Subscription=new Subscription();
  constructor(private userService:UserService,private orderService:OrderService){}

  ngOnInit(): void {
      this.subscriptions.add(
        this.orderService.getOrders(this.userService.loggedInUser.email).subscribe(
          pastOrders=>{
            this.pastOrders=pastOrders
            console.log(this.pastOrders)
          }
        )
      )
  }
  selectOrder(event:any):void{
    if(Number.parseInt(event.target.value)>0){
        this.pastOrder=this.pastOrders.filter((order)=>order.orderId ===Number.parseInt(event.target.value))[0];
        this.getOrderProducts(this.pastOrder.orderId);
    }else{
      this.pastOrder=<any>undefined;
      this.pastOrderProducts=[];
    }
  }
  getOrderProducts(orderId:number):void{
    this.subscriptions.add(
      this.orderService.getOrderProducts(orderId).subscribe((Products)=>{
        this.pastOrderProducts=Products
        console.log(this.pastOrderProducts)
      })
    )
  }
  ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
  }

}
