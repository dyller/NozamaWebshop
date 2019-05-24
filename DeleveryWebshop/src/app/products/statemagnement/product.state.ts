import {User} from '../../shared/entities/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../../shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddUser, RemoveUser} from '../../shared/statemangement/action/user.actions';
import {Product} from '../../shared/entities/product';
import {AddProduct, ReadAllProduct, RemoveProduct, UpdateProduct} from './product.actions';
import {ProductService} from '../../shared/service/product.service';
import {log} from 'util';

export class ProductStateModel {
  public products: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products:
    [{
      price: 1,
      name: '',
      pictureId: '',
      url: '',
      amount: 1,
      category: '',
      details: ''
    }]
  }
})

export class ProductState {

  constructor(private ps: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}
  @Selector()
  static getProducts(state: ProductStateModel)
  {
    return state.products;
  }

  @Action(AddProduct)
  add({getState, patchState }: StateContext<ProductStateModel>, { payload, payload2 }: AddProduct) {
    console.log('What is payload in addProduct.state.ts: ' + JSON.stringify(payload));
    const state = getState();
    /*patchState({
      products: [...state.products, payload]
    });*/

    this.ps.addProductWithImage(payload, payload2)
      .subscribe();
  }

  @Action(RemoveProduct)
  remove({getState }: StateContext<ProductStateModel>, { payload }: RemoveProduct) {
    console.log('RemoveProduct, inside prod state: ' + payload);
    const state = getState();
    this.ps.deleteProduct(payload)
      .subscribe(productFromFirebase => {
      window.alert('product');
    }, error1 => {
      window.alert('product not found');
    });
  }


 @Action(UpdateProduct)
  update({getState }: StateContext<ProductStateModel>, { payload }: UpdateProduct) {
    const state = getState();
          this.ps.updateProduct(payload);
  }

  @Action(ReadAllProduct)
  get(ctx: StateContext<ProductStateModel>, { }: ReadAllProduct) {
    const state = ctx.getState();
    return this.ps.getProducts().subscribe(sas =>
    {
      sas.map(prd =>
      {
        console.log('Prod name: ' + prd.name + ' price: ' + prd.price);
        console.log('Trying something in the state ' + ctx.setState({
          ...state,
          products: [prd]
        }));

        ctx.setState({
          ...state,
          products: [prd]

        });
      });
    });
  }

}
