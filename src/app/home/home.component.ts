import { Component } from '@angular/core';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/products/products.storeItem';
import { SearchKeyword } from './types/searchKeywork.type';
import { NavigationEnd,Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private categoryStoreItem:CategoriesStoreItem,private productStore:ProductStoreItem,private router:Router){
    categoryStoreItem.loadCategories();
    productStore.loadProducts();
   router.events
   .pipe(filter((event)=>event instanceof NavigationEnd))
   .subscribe(event=>{
    if((event  as NavigationEnd).url==='/home'){
      router.navigate(['/home/products']);
      
    }
    })
  }

  onCategoryClicked(categoryId:number):void{
    this.productStore.loadProducts('maincategoryid='+categoryId)
  }
  onSearchClicked(searchKeyword:SearchKeyword):void{
    console.log(searchKeyword)
    this.productStore.loadProducts('maincategoryid=' +searchKeyword.categoryId+'&keyword='+searchKeyword.keyword);
  }
}
