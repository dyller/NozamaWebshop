import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuth} from '@angular/fire';
import {AuthService} from '../core/auth.service';
import {User} from '../entities/user';
@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})

export class NvbarComponent implements OnInit
{


  currentUser: User;

  constructor(
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

  }

  deleteAccount()
  {
    this.authService.deleteAccount(this.currentUser);
  }

  /*countItems(): number {
   let count = 0 ;
   if (this.cartSize) {
      for (const value of this.cartSize) {
        count = + value.amount;
        }
      }
      return count;
  }*/
}
