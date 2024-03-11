import { Component } from '@angular/core';
import { ProductStoreItem } from '../../services/products/products.storeItem';

@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrls: ['./products-gallery.component.scss']
})
export class ProductsGalleryComponent {
constructor(private productStoreItem:ProductStoreItem){

}
onSelectSubCategory(subCategoryId:number):void{
  console.log("clicked",subCategoryId)
  this.productStoreItem.loadProducts('subcategoryid='+subCategoryId)
}
}
