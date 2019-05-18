import {User} from '../../shared/entities/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../../shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddUser, RemoveUser} from '../../shared/statemangement/action/user.actions';
import {Product} from '../../shared/entities/product';
import {AddProduct, ReadAllProduct, RemoveProduct, UpdateProduct} from "./product.actions";
import {ProductService} from "../../shared/service/product.service";

export class ProductStateModel {
  products: Product[];

}
@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})
export class ProductState {
  constructor(private ps: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}
  @Selector()
  static getProducts(state: ProductStateModel) {
    return state.products;
  }

  @Action(AddProduct)
  add({getState }: StateContext<ProductStateModel>, { payload }: AddProduct) {
    const state = getState();
  }

  @Action(RemoveProduct)
  remove({getState }: StateContext<ProductStateModel>, { payload }: RemoveProduct) {
    const state = getState();  }

 @Action(UpdateProduct)
  remove({getState }: StateContext<ProductStateModel>, { payload }: UpdateProduct) {
    const state = getState();  }
  @Action(ReadAllProduct)
  remove({getState }: StateContext<ProductStateModel>, { }: ReadAllProduct) {
    const state = getState();  }

}
