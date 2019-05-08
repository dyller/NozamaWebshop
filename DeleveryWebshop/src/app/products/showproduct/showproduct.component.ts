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
              private cart: CartService) {
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
  }

  deleteProduct(product: Product) {
    const obs = this.ps.deleteProduct(product.id);
    obs.subscribe(productFromFirebase => {
      window.alert('product with id: ' + productFromFirebase.id + ' is Deleted');
    }, error1 => {
      window.alert('product not found id: ' + product.id);
    });
  }

  logut() {
    firebase.auth().signOut();
  }

  productToCart(product) {
    this.cart.add(product);
  }
}
