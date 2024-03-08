import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
@Component({
  selector: 'app-catnavigation',
  templateUrl: './catnavigation.component.html',
  styleUrls: ['./catnavigation.component.scss']
})
export class CatnavigationComponent {
constructor(public categoryStore:CategoriesStoreItem){
  
}
}
