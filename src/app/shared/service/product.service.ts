import { Injectable } from '@angular/core';
import {ApiBaseService} from "../API/api-base.service";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../model/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiBaseService {
  constructor(public http: HttpClient) {
    super(http);
  }

  getProducts(): Observable<ProductModel[]> {
    return this.get('products');
  }

  deteleProducts(product: ProductModel[]):Observable<ProductModel[]> {
    return this.delete(`products/${product['id']}`, product);
  }

  dublicateProducts(product: ProductModel[]):Observable<ProductModel[]> {
    return this.post('products/dublicate', product);
  }

  editProducts(product: ProductModel[]): Observable<ProductModel[]> {
    return this.put(`products/update/${product['id']}`, product);
  }

  createProducts(product: ProductModel[]):Observable<ProductModel[]> {
    return this.post('products/create', product);
  }

}
