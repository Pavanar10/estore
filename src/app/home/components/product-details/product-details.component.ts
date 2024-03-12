import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../../types/product.type';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit ,OnDestroy{
  product:Product;
subscriptions:Subscription=new Subscription();
faShoppingCart=faShoppingCart;

constructor(private cart:CartStoreItem,private activatedRoute:ActivatedRoute,private productService:ProductsService){

}
  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.subscriptions.add(
      this.productService.getProduct(id).subscribe(product => {
        this.product = product[0]
        console.log("productssssss", product)
      })
    )
  }

  addToCart(){
    this.cart.addProducts(this.product);
  }
ngOnDestroy(){
this.subscriptions.unsubscribe()
}
}
