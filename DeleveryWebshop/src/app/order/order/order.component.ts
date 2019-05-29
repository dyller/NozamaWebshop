import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/entities/product';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {DeleteCart} from '../../shared/statemangement/cart-state/cart.actions';
import {CartState} from '../../shared/statemangement/cart-state/cart.state';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Select(CartState.getProductsInCart) cartProduct: Observable<Product[]>;

  constructor(private store: Store) {

}

  ngOnInit() {

  }

  buyProducts() {
    this.store.dispatch(new DeleteCart()).subscribe();

  }
}
