import { Component } from '@angular/core';
import { Category } from '../../types/category-type';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss']
})
export class SidenavigationComponent {
caterory:Category[]=[];
constructor(private categoryService:CategoryService){
  this.caterory=categoryService.getAllCategories();
}
getCategoryById(id?:number):Category[]{
  return this.caterory.filter((x)=>x.parent_category === id);
  
}
}
