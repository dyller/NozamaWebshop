import { Component, OnInit } from '@angular/core';
import {Product} from '../../shared/entities/product';
import {CartService} from '../../shared/service/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderList: Array<Product> = this.cart.getAllProduts();
  constructor(private cart: CartService) { }

  ngOnInit() {
  }

  buyProducts(product) {
    
    this.cart.addToFB(product);
  }
}
