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
import {ReadAllProduct, RemoveProduct} from '../../shared/statemangement/product-state/product.actions';
import {ProductState, ProductStateModel} from '../../shared/statemangement/product-state/product.state';
import {AddToCart} from '../../shared/statemangement/cart-state/cart.actions';
import {CartState} from '../../shared/statemangement/cart-state/cart.state';
import {AuthService} from "../../shared/core/auth.service";

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
              private store: Store,
              private auth: AngularFireAuth){
  }
 ngOnInit() {

   this.store.dispatch(new ReadAllProduct());
  }

  deleteProduct(product: Product)
  {
    const obs = this.store.dispatch(new RemoveProduct(product));
  }

  logut() {
    this.auth.auth.signOut();
  }

  productToCart(product) {
    this.store.dispatch(new AddToCart(product));
  }
}
