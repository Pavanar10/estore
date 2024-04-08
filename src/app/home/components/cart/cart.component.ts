import { Component } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../types/cart.type';
import { Router } from '@angular/router';
import { OnInit,OnDestroy } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { UserService } from '../../services/users/user-service.service';
import { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';
import { DeliveryAddress } from '../../types/cart.type';
import { OrderService } from '../../services/order/order.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  implements OnInit,OnDestroy {
faTrash=faTrash;
orderForm:FormGroup;
user:loggedInUser;
subscriptions:Subscription = new Subscription();


alertType=0;
alterMessage='';
disableCheckout:boolean=false;

constructor(public cartStore:CartStoreItem,private router:Router,private fb:FormBuilder,private userService:UserService,
  private orserService:OrderService){
  this.user={
    firstName:'',
    lastName:'',
    address:'',
    city:'',
    state:'',
    pin:'',
    email:''
  }
  this.subscriptions.add(userService.loggedInUser$.subscribe(loggedUser=>{
    if(loggedUser.firstName){
      this.user=loggedUser
    }
  }));
}
navigateToHome():void{
  this.router.navigate(['home/products']);
}
updateQuantity($event:any,cartItem:CartItem):void{
  console.log('caled');
if($event.target.innerText ==='+'){
  this.cartStore.addProducts(cartItem.product)
}else if($event.target.innerText==='-'){
  this.cartStore.decreaseProductQuantity(cartItem)
}
}
removeItem(cart:CartItem):void{
  this.cartStore.removeProduct(cart)
}
ngOnInit(): void {
  this.orderForm=this.fb.group({
    name:[`${this.user.firstName} ${this.user.lastName}`,Validators.required],
    address:[`${this.user.address}`,Validators.required],
    city:[`${this.user.city}`,Validators.required],
    state:[`${this.user.state}`,Validators.required],
    pin:[`${this.user.pin}`,Validators.required]
  })
}
onSubmit():void{
if(this.userService.isUserAuthenticated){
  const deliveryAddress:DeliveryAddress={
    userName:this.orderForm.get('name')?.value,
    address:this.orderForm.get('address')?.value,
    city:this.orderForm.get('city')?.value,
    state:this.orderForm.get('state')?.value,
    pin:this.orderForm.get('pin')?.value
  };
  this.subscriptions.add(
    this.orserService.saveOrder(deliveryAddress,this.user.email).subscribe(
      {
        next:result=>{
          this.cartStore.clearCart();
          this.alertType=0;
          this.alterMessage='Order registered Successfully';
          this.disableCheckout=true;
        },
        error:(error)=>{
          this.alertType=2;
          if(error.error.message==='Authentification falied'){
            this.alterMessage='Please login to register your order';
          }else{
            this.alterMessage=error.error.message;
          }
        }
      }
    )
  )
}
}
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
}
