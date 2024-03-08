import { Injectable } from '@angular/core';
import { Product } from '../../types/product.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ProductsService {

  constructor(private httpClient:HttpClient) { }
  getProductsList():Observable<Product[]>{
    return this.httpClient.get<Product[]>('http://localhost:5001/products');
  }
}
