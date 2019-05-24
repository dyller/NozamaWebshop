import {Component, OnInit, Provider} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {FileService} from '../../shared/service/file.service';
import {ProductService} from '../../shared/service/product.service';
import {switchMap, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {CartService} from '../../shared/service/cart.service';
import {Store} from '@ngxs/store';
import {RemoveProduct} from '../statemagnement/product.actions';
import {AddToCart} from "../../shared/statemangement/cart/cart.actions";

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {

  products: Observable<Product[]>;
  constructor(private ps: ProductService,
              private fs: FileService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private cart: CartService,
              private store: Store) {
  }
 ngOnInit() {
    this.products = this.ps.getProducts()
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
      );

       /*this.store.dispatch(ReadAllProduct)
     .pipe(
       tap(products =>
       {
         console.log('message from showprod.commp');
         products.forEach(product =>
         {
           if (product.pictureId)
           {
             this.fs.getFileUrl(product.pictureId)
               .subscribe(url =>
               {
                 product.url = url;
               });
           }
         });
       })
     );*/
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
    this.store.dispatch(new AddToCart(product)).
      subscribe();
  }
}
