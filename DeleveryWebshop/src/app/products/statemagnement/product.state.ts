import {User} from '../../shared/entities/user';
import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {UserService} from '../../shared/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AddUser, RemoveUser} from '../../shared/statemangement/action/user.actions';
import {Product} from '../../shared/entities/product';
import {AddProduct, ReadAllProduct, RemoveProduct, UpdateProduct} from './product.actions';
import {ProductService} from '../../shared/service/product.service';
import {log} from 'util';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {FileService} from "../../shared/service/file.service";

export interface ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: []
  }
})

export class ProductState
{
  constructor(private ps: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fs: FileService) {}



  @Selector()
  static getProducts(state: ProductStateModel): Product[]
  {
    if (state) {
      return state.products;
    }
    else {
      return [];
    }
  }

  @Action(AddProduct)
  add(ctx: StateContext<ProductStateModel>, action: AddProduct) {
    const state = ctx.getState();
    if (state) {
      ctx.patchState({
        products: [...state.products, action.payload]
      });

      this.ps.addProductWithImage(action.payload, action.payload2).subscribe(() => {
      });
    }
    else {
      ctx.setState({
        ...state,
        products: [
          action.payload
        ]
      });
    }
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
  get(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    this.ps.getProducts()
      .pipe(
        tap(products => {
          products.forEach(product => {
            if (product.pictureId) {
              this.fs.getFileUrl(product.pictureId)
                .subscribe(url => {
                  product.url = url;

                });
            }
          });
          console.log(JSON.stringify(products));
          //console.log(JSON.stringify(sas));
          ctx.setState({
            ...state,
            products: products
          });
        })
      ).subscribe();

     /* sas.map(prd =>
      {
         state = ctx.getState();
        console.log('Prod name: ' + prd.name + ' price: ' + prd.price + ' img? ' + prd.url);


        ctx.setState({
          ...state,
          products: [prd]

        });
      });*/

  }

}
