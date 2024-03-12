import { StoreItem } from "src/app/shared/storeItem";
import { Observable } from "rxjs";
import { ProductsService } from "./products.service";
import { Product } from "../../types/product.type";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductStoreItem extends StoreItem<Product[]>{

    constructor(private productService:ProductsService){
        super([])
    }

    async loadProducts(query?:string){
        this.productService.getProductsList(query).subscribe(products=>{
            this.setValue(products)
        })
    }

    get products$():Observable<Product[]>{
        return this.value$
    }
    get products():Product[]{
        return this.value
    }


}