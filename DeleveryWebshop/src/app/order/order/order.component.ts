import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/entities/product';
import {CartService} from '../../shared/service/cart.service';
import {forEach} from '@angular/router/src/utils/collection';
import {count} from "rxjs/operators";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList: Array<Product> = this.cart.getAllProduts();
  showLost: Array<Product>;
  constructor(private cart: CartService) {
    if (this.orderList !== null) {
      this.orderList.sort((a, b) => a.name.localeCompare(b.name));
      for (let i = 0; i < this.orderList.length; i++) {
      }

  }}

  ngOnInit() {
  }

  buyProducts() {
    this.cart.addToFB(this.orderList);
  }
}
