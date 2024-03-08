import { Component } from '@angular/core';
import { ProductStoreItem } from '../../services/products/products.storeItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

  constructor(public productService:ProductStoreItem){
  
  }

}
