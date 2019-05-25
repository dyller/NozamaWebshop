import {Product} from '../../entities/product';
import {Action, NgxsAfterBootstrap, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddToCart, DeleteCart} from "./cart.actions";
import {Observable, of} from "rxjs";
import {append, patch} from "@ngxs/store/operators";

export interface CartStateModel {
  productsCart: Observable<Product[]>;

}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    productsCart: of([])
  }
})


export class CartState  implements NgxsOnInit, NgxsAfterBootstrap{


  @Selector()
  static getProducts(state: CartStateModel): Observable<Product[]> {
    return state.productsCart;
  }

  public ngxsOnInit({ getState, setState }: StateContext<Product[]>) {
    const state: Product[] = getState();
    const payload: Product = null;
    if (!state.includes(payload)) {
      setState([...state, payload]);
    }
  }
  public ngxsAfterBootstrap({ getState, setState }: StateContext<Product[]>): void {
    const state: Product[] = getState();
    const payload: Product = null;
    if (!state.includes(payload)) {
      setState([...state, payload]);
    }
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
          product.product
        ]
      });
    }
  }

  @Action(DeleteCart)
  DeleteCart(ctx: StateContext<CartStateModel> ) {
    const state = ctx.getState();
      ctx.patchState({
        productsCart: of([])
      });
  }

}

