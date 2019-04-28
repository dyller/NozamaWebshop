import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {User} from '../entities/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from "../entities/product";
const collection_path = 'user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  addUser(userData: User): Observable<User> {
    return from(
      this.db.collection(collection_path).add(
        {
          username: userData.username,
          password: userData.password,
          address: userData.address
        }
      )
    ).pipe(
      map(productRef => {
        userData.id = productRef.id;
        return userData;
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.db
      .collection<User>(collection_path)
      // This will return an Observable
      .snapshotChanges()
      .pipe(
        map(actions => {
          // actions is an array of DocumentChangeAction
          return actions.map(action => {
            const data = action.payload.doc.data() as User;
            return {
              id: action.payload.doc.id,
              username: data.username,
              password: data.password,
              address: data.address
            };
          });
        })
      );
  }

  deleteUser(id: string): Observable<User> {
    return this.db.doc<User>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            throw new Error('User not found');
          } else {
            return from(
              this.db.doc<User>(collection_path + '/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = productDocument.data() as User;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
  }
}
