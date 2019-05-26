import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../entities/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AddUser, RemoveUser} from '../statemangement/action/user.actions';
import {Store} from '@ngxs/store';
import {ImageMetadata} from '../entities/image-metadata';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  createUser(user: User, imgMeta: ImageMetadata) {
    firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password).
    then((credential) => {
      user.id = credential.user.uid;
     this.store.dispatch(new AddUser(user, imgMeta));
    })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('auth.service, create user error: ' + error);
        // ...
      });
  }
  deleteAccount(currentUser: User)
  {
    this.store.dispatch(new RemoveUser(currentUser));
  }
}
