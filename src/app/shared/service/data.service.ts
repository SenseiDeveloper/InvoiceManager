import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ProductModel} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<any>();


  sendUpdateProduct(products: ProductModel[]) {
    this.subject.next(products);
  }

  getUpdateData(): Observable<any> {
    return this.subject.asObservable();
  }
}
