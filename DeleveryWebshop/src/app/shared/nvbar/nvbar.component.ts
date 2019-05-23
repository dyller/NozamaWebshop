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
import {forEach} from "@angular/router/src/utils/collection";
@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})

export class NvbarComponent implements OnInit
{
  cartSize: Product[] = this.cart.getAllProduts();
  itemsNumber: number = this.countItems();
  currentUser: User;

  constructor(private cart: CartService,
              private user: UserService,
              private authService: AuthService)
  {
    firebase.auth().onAuthStateChanged(users =>
    {
      if (users) {
        this.user.getUserById(users.uid).subscribe(couldStoreUser =>
        {
          this.currentUser = couldStoreUser;
        });
      }
      else
      {
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

  deleteAccount()
  {
    console.log('Current user in navbar is: ' + this.currentUser);
    this.authService.deleteAccount(this.currentUser);
  }

  countItems(): number {
    let count = 0 ;
    /*if (this.cartSize !== null) {
      for(let value of this.cartSize) {
        count = count + value.amount;
      }
    }*/
    return count;
  }

}
