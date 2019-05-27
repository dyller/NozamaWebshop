import {Component, OnInit, Provider} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {FileService} from '../../shared/service/file.service';
import {ProductService} from '../../shared/service/product.service';
import {switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Select, Store} from '@ngxs/store';
import {ReadAllProduct, RemoveProduct} from '../statemagnement/product.actions';
import {ProductState, ProductStateModel} from '../statemagnement/product.state';
import {AddToCart} from '../../shared/statemangement/cart/cart.actions';
import {CartState} from '../../shared/statemangement/cart/cart.state';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {

  // Reads the name of the state from the state class
  @Select(ProductState.getProducts) prods: Observable<Product[]>;
  //subscription: Subscription;

  constructor(private ps: ProductService,
              private fs: FileService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private store: Store) {
  }
 ngOnInit() {

   this.store.dispatch(new ReadAllProduct());
   this.prods.subscribe(sas =>
   {

   });
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
     some.map(sad => {
       console.log('and map? ' + JSON.stringify(sad.name) + ' and img? ' + JSON.stringify(sad.url));
     });
   });
  }

  deleteProduct(product: Product) {
    try {
      const obs = this.store.dispatch(new RemoveProduct(product))
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
    this.store.dispatch(new AddToCart(product)).
      subscribe();

  }
}
