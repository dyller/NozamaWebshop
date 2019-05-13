import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from '../entities/product';
import {environment} from '../../../environments/environment';
import {CartService} from '../service/cart.service';
import {UserService} from '../service/user.service';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuth} from '@angular/fire';
import {AuthService} from "../core/auth.service";
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
              private user: UserService,
              private authService: AuthService){
    firebase.auth().onAuthStateChanged(users => {
      if (users) {
      console.log('User: ' + users.uid);
        this.user.getUserById(users.uid).subscribe(couldStoreUser => {
        this.currentUser = couldStoreUser;
      });
    } else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit() {
    this.cart.watchStorage().subscribe((data: string) => {
      if (this.cartSize !== null) {
        this.cartSize = this.cart.getAllProduts();
        this.itemsNumber = this.countItems();
      }
     // this will call whenever your localStorage data changes
      // use localStorage code here and set your data here for ngFor
    });
  }

  deleteAccount() {
    this.authService.deleteAccount(firebase.auth().currentUser);
  }
  countItems(): number {
    let count = 0 ;
    if (this.cartSize !== null) {
      this.cartSize.forEach(value => {
        count = count + value.amount;
      });
    }
    return count;
  }

}
