import {Component, OnInit, Provider} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {FileService} from '../../shared/service/file.service';
import {ProductService} from '../../shared/service/product.service';
import {switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {CartService} from '../../shared/service/cart.service';
import {Select, Store} from '@ngxs/store';
import {ReadAllProduct, RemoveProduct} from '../statemagnement/product.actions';
import {ProductState, ProductStateModel} from '../statemagnement/product.state';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {

  //@Select(state => state.prods) animals$: Observable<any>;


  products: Observable<Product[]>;

  // Reads the name of the state from the state class
  @Select(ProductState.getProducts) prods: Observable<Product[]>;

  constructor(private ps: ProductService,
              private fs: FileService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private cart: CartService,
              private store: Store) {
  }
 ngOnInit() {

   this.store.dispatch(ReadAllProduct);
    /*this.products = this.ps.getProducts()
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
        })
      );*/



   this.prods.subscribe(some => {
     console.log('Please make this defined: ' + JSON.stringify(some));
   });
  }

  deleteProduct(product: Product) {
    try {
      const obs = this.store.dispatch(new RemoveProduct(product.id));
      console.log('What is the prodId: ' + product.id);
      console.log(obs);
    }catch (e) {
      console.log('deleteProd error, in component: ' + e);
    }
  }

  logut() {
    firebase.auth().signOut();
  }

  productToCart(product) {
    this.cart.add(product);
  }
}
