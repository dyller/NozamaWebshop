import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/entities/product';
import {CartService} from '../../shared/service/cart.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList: Array<Product> = this.cart.getAllProduts();
  constructor(private cart: CartService) {
    if (this.orderList !== null) {
      this.orderList.sort((a, b) => a.name.localeCompare(b.name));
      for (let i = 0; i < this.orderList.length; i++) {
        console.log(this.orderList[i]);
      }
    }
    let current = null;
    let cnt = 0;
    let count = [];
    for (let i = 0; i < this.orderList.length; i++) {
      if (this.orderList[i].name !== current) {
        if (cnt > 0) {
          count.push(cnt);
          console.log(current + ' comes --> ' + cnt + ' times<br>');
        }
        current = this.orderList[i].name;

        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      console.log(current + ' comes --> ' + cnt + ' times');
      count.push(cnt);
    }
console.log(count);
  }

  ngOnInit() {
  }

  buyProducts(product) {
    
    this.cart.addToFB(product);
  }
}
