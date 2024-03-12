import { StoreItem } from "src/app/shared/storeItem";
import { Category } from "../../types/category-type";
import { CategoryService } from "./category.service";
import { Observable ,map} from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class CategoriesStoreItem extends StoreItem<Category[]>{
    constructor(private categoryService:CategoryService){
        super([])
    }

    async loadCategories(){
        this.categoryService.getAllCategories().subscribe((categories)=>{
            this.setValue(categories)
        })
    }

    get categories$():Observable<Category[]>{
        return this.value$
    }

    get topLevelCategories$():Observable<Category[]>{
        return this.value$.pipe(map(categories=>
            categories.filter((x)=>x.parent_category_id===null)
        ));
    }
}