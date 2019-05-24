import {Product} from '../../entities/product';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddToCart, DeleteCart} from "./cart.actions";
import {Observable, of} from "rxjs";

export interface CartStateModel {
  productsCart: Product[];

}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    productsCart: []
  }
})


export class CartState {


  @Selector()
  static getProducts(state: CartStateModel) {
    console.log(JSON.stringify(state.productsCart));
    return state.productsCart;
  }

  @Action(AddToCart)
  AddToCart(ctx: StateContext<CartStateModel>, product: AddToCart ) {
    const state = ctx.getState();
    if ( ctx.getState()){
      ctx.setState({
      ...state,
        productsCart: [
        ...state.productsCart,
          product.product
      ]
    });
    }
    else {
      ctx.setState({
        ...state,
        productsCart: [
          product.product,
        ]
      });
    }
  }

  @Action(DeleteCart)
  DeleteCart(ctx: StateContext<CartStateModel> ) {
    const state = ctx.getState();
      ctx.patchState({
        productsCart: []
      });  
  }

}

