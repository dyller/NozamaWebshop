import { Injectable } from '@angular/core';
import {Product} from '../entities/product';
import {from, Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../entities/user';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
const key = environment.localhostKey;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFirestore) { }

  private storageSub = new Subject<boolean>();

  add(product: Product) {
    if (sessionStorage.getItem(key) == null) {
      const products = [
      product
    ];
      sessionStorage.setItem(key, JSON.stringify(products));
    } else {
      const products = JSON.parse(sessionStorage.getItem(key));
      products.push(product);
      sessionStorage.setItem(key, JSON.stringify(products));
    }
    this.storageSub.next(true);

    // We add the userid and productId to order table
    // We also need to check if the user is currently logged in
    if (firebase.auth().currentUser.uid === null) {

    } else {
      this.db.collection('orders').add(
        {
          productId: product.id,
          userId: firebase.auth().currentUser.uid
        }
      );
    }
  }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  getAllProduts(): Array<Product> {
    return JSON.parse(sessionStorage.getItem(environment.localhostKey));
  }
}
