import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from '../entities/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {AddUser} from '../statemangement/action/product.actions';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private store: Store
  ) {
  }

  createUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).
    then((credential) => {
      user.id = credential.user.uid;
     this.store.dispatch(new AddUser(user));
    })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        this.router.navigate([''],
          {relativeTo: this.activatedRoute});
        // ...
      });
  }
}
