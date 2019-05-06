import { Injectable } from '@angular/core';
import {Product} from "../entities/product";
const key = 'cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }


  add(product: Product) {
    localStorage.setItem(key, JSON.stringify(product));

  }
}
