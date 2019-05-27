import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../shared/entities/product';
import {AddProduct, ReadAllProduct, RemoveProduct, UpdateProduct} from './product.actions';
import {ProductService} from '../../shared/service/product.service';
import {tap} from 'rxjs/operators';
import {FileService} from '../../shared/service/file.service';
import {patch, removeItem, updateItem} from '@ngxs/store/operators';

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
  remove(ctx: StateContext<ProductStateModel>, { payload }: RemoveProduct)
  {
    console.log('RemoveProduct, inside prod state: ' + payload);
    ctx.setState(
      patch({
        products: removeItem<Product>(name => name === payload)
      })
    );
    this.ps.deleteProduct(payload)
      .subscribe(rPrd => {
        console.log('Remove obj complete: ' + rPrd.name);
      });
  }


 @Action(UpdateProduct)
  update(ctx: StateContext<ProductStateModel>, { newName, prevName }: UpdateProduct)
  {
    ctx.setState(
      patch( {
        products: updateItem<Product>(name => name === newName, prevName)
      })
    );
    console.log('Does update work for the state: ' + newName.name);
    this.ps.updateProduct(newName);
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
  }

}
