import {User} from '../../shared/entities/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../../shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddUser, RemoveUser} from '../../shared/statemangement/action/user.actions';
import {Product} from '../../shared/entities/product';
import {AddProduct, ReadAllProduct, RemoveProduct, UpdateProduct} from './product.actions';
import {ProductService} from '../../shared/service/product.service';

export class ProductStateModel {
  products: Product[];

}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products:
    [{
      price: 22,
      name: 'CheeseSocks',
      pictureId: 'socks.png',
      url: 'socks.dk',
      amount: 1,
      category: 'Books',
      details: 'Great socks of Samuel, with ultra good smell'
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
    patchState({
      products: [...state.products, payload]
    });
    this.ps.addProductWithImage(payload, payload2)
      .subscribe(() => {
        this.router.navigate([''],
          {relativeTo: this.activatedRoute});
      });
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
    console.log('What is the updateProduct Paylod: ' + payload.name);
          this.ps.updateProduct(payload);
          this.router.navigate([''],
            {relativeTo: this.activatedRoute});
  }

  @Action(ReadAllProduct)
  get({getState}: StateContext<ProductStateModel>, { payload}: ReadAllProduct) {
    const state = getState();
    return this.ps.getProducts().subscribe(sas => {
      console.log('Return stuff from service: ' + sas.toString());
      });
  }

}
