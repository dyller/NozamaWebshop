import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from '../entities/product';
import {environment} from '../../../environments/environment';
import {CartService} from '../service/cart.service';
import {UserService} from '../service/user.service';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuth} from '@angular/fire';
import {User} from '../entities/user';
@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})
export class NvbarComponent implements OnInit {
  cartSize: Array<Product> = this.cart.getAllProduts();
  itemsNumber: number = this.countItems();
 currentUser: User;

  constructor(private cart: CartService,
              private user: UserService ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      console.log('User: ' + user.uid);
        this.user.getUserById(user.uid).subscribe(couldStoreUser => {
        this.currentUser = couldStoreUser;
      });
    } else {
        this.currentUser = null;
      }
      }
    );
  }

  ngOnInit() {
    this.cart.watchStorage().
    this.cart.watchStorage().subscribe((data: string) => {
      this.cartSize = this.cart.getAllProduts();
      this.itemsNumber = this.countItems();
     // this will call whenever your localStorage data changes
      // use localStorage code here and set your data here for ngFor
    });
  }
  countItems(): number {
    let count = 0 ;
    this.cartSize.forEach(value => {
      count = count + value.amount;
    });
    return count;
  }

}
