import { storeItem } from "src/app/shared/storeItem";
import { Observable } from "rxjs";
import { ProductsService } from "./products.service";
import { Product } from "../../types/product.type";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductStoreItem extends storeItem<Product[]>{

    constructor(private productService:ProductsService){
        super([])
    }

    async loadProducts(){
        this.productService.getProductsList().subscribe(products=>{
            this.setValue(products)
        })
    }

    get products$():Observable<Product[]>{
        return this.value$
    }


}