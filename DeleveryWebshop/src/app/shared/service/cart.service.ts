import { Injectable } from '@angular/core';
import {Product} from '../entities/product';
const key = 'cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }


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

  }
}
