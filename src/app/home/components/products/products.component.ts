import { Component } from '@angular/core';
import { ProductStoreItem } from '../../services/products/products.storeItem';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/product.type';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  faShoppingCart=faShoppingCart;

  constructor(public productService:ProductStoreItem,private cart:CartStoreItem){
  
  }

  addToCart(product:Product){
    this.cart.addProducts(product)
  }

}
