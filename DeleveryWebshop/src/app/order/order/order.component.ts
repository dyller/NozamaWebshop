import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/entities/product';
import {CartService} from '../../shared/service/cart.service';
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {CartState} from "../../shared/statemangement/cart/cart.state";
import {DeleteCart} from "../../shared/statemangement/cart/cart.actions";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Select(CartState.getProducts) cartProduct: Observable<Product[]>;
  orderList: Product[];
  constructor(private cart: CartService,
              private store: Store) {

}

  ngOnInit() {

      }

  buyProducts() {/*
    this.cart.clear();
    this.cart.addToFB(this.orderList);*/
    this.store.dispatch(new DeleteCart()).subscribe();

  }
}
