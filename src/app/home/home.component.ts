import { Component } from '@angular/core';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/products/products.storeItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private categoryStoreItem:CategoriesStoreItem,private productStore:ProductStoreItem){
    categoryStoreItem.loadCategories();
    productStore.loadProducts();
  }

}
