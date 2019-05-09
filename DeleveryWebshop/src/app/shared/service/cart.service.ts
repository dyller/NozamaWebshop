import { Injectable } from '@angular/core';
import {Product} from '../entities/product';
import {from, Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../entities/user';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import {debug} from "util";
import {forwardRefResolver} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {forEach} from "@angular/router/src/utils/collection";
const key = environment.localhostKey;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Array<Product> ;
  constructor(private db: AngularFirestore) { }

  private storageSub = new Subject<boolean>();

  add(product: Product) {
    product.amount = 1 ;
    if (sessionStorage.getItem(key) == null) {
      const products = [
      product
    ];
      sessionStorage.setItem(key, JSON.stringify(products));
    } else  {
       this.products = JSON.parse(sessionStorage.getItem(key));
      for (let i = 0; i < this.products.length ; i++) {
        if (this.products[i].name === product.name) {
          this.products[i].amount = this.products[i].amount + 1;
          sessionStorage.setItem(key, JSON.stringify(this.products));
          return;
        }
      }

      this.products.push(product);
      sessionStorage.setItem(key, JSON.stringify(this.products));
    }
    this.storageSub.next(true);

    // We add the userid and productId to order table
    // We also need to check if the user is currently logged in

  }

  addToFB(product: Product) {
    if (firebase.auth().currentUser.uid !== null) {
      const products = JSON.parse(sessionStorage.getItem(key));
      for (const prod of products) {
        console.log(prod);
        this.db.collection('orders').doc(firebase.auth().currentUser.uid).set(
          {
            productId: [ {prodId: prod.id}],
            userId: firebase.auth().currentUser.uid
          }, {merge: true}
        );
      }

    } else {
      this.db.collection('orders').add(
        {
          productId: [product.id]
        });
    }
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  getAllProduts(): Array<Product> {
    return JSON.parse(sessionStorage.getItem(environment.localhostKey));
  }
}
