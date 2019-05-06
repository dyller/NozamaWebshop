import { Injectable } from '@angular/core';
import {Product} from '../entities/product';
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
const key = environment.localhostKey;
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private storageSub = new Subject<boolean>();
  add(product: Product) {
    if (localStorage.getItem(key) == null) {
      const products = [
      product
    ];
      localStorage.setItem(key, JSON.stringify(products));
    } else {
      const products = JSON.parse(localStorage.getItem(key));
      products.push(product);
      localStorage.setItem(key, JSON.stringify(products));
    }
    this.storageSub.next(true);
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  getAllProduts(): Array<Product> {
    return JSON.parse(localStorage.getItem(environment.localhostKey));
  }
}
