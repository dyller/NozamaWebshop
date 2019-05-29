import {Product} from '../../entities/product';
import {Action, NgxsAfterBootstrap, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {AddToCart, DeleteCart} from './cart.actions';
import {Observable, of} from 'rxjs';

export interface CartStateModel {
  productsCart: Product[];

}

@State<CartStateModel>({

  name: 'cartModel',
  defaults: {
    productsCart: []
  }
})


export class CartState  {


  @Selector()
  static getProductsInCart(state: CartStateModel): Product[]
  {
    if (state){
    return state.productsCart;
    }
    else
    {
      return [];
    }
  }

  @Action(AddToCart)
  AddToCart(ctx: StateContext<CartStateModel>, action: AddToCart ) {
  const state = ctx.getState();
    if (state){
      ctx.patchState({
        productsCart: [
          ...state.productsCart,
          action.prod,
        ]
      });
      /*
      ctx.setState({
      ...state,
        productsCart: [
        ...state.productsCart,
          user-state.prod,
      ]
    });*/
    }
    else {
      ctx.setState({
        ...state,
        productsCart: [
          action.prod
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

