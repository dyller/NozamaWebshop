import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/entities/product';
import {CartService} from '../../shared/service/cart.service';
import {Observable} from "rxjs";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList: Product[];
  constructor(private cart: CartService) {

}

  ngOnInit() {

this.orderList = this.cart.getAllProduts();
    for (let th of this.orderList)
    {
      console.log(JSON.stringify(th));
    }
      }

  buyProducts() {
    this.cart.clear();
    this.cart.addToFB(this.orderList);
  }
}
