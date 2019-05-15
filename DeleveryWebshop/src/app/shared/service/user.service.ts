import { Injectable } from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {User} from '../entities/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../entities/product';
import {HttpClient} from '@angular/common/http';

const   collection_path = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore,
              private http: HttpClient) { }

  addUser(userData: User): Observable<User> {
    if (userData && userData.username && userData.address && userData.email)
    {
      const endPoint = 'https://us-central1-nozamaandroid.cloudfunctions.net/users';
      const userToCreate: any =
      {
        username: userData.username,
        address: userData.address,
        email: userData.email,
        phonenumber: userData.phonenumber
      };
      return this.http.post<User>(endPoint, userToCreate);
    }
    else
    {
      return throwError('You need to fill all the fields!');
    }
  }

  updateUser(userData: User) {
    this.db.collection(collection_path).doc(userData.id).update(
      {
        username: userData.username
      }
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
              address: data.address,
              phonenumber: data.phonenumber,
              email: data.email
            };
          });
        })
      );
  }

  getUserById(id: string): Observable<User>
  {
    return this.db.doc<User>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(() => {
        }),
        switchMap(productDocument =>
        {
          if (!productDocument || !productDocument.data())
          {
            throw new Error('User not found');
          } else
            {
              return from
            (
              this.db.doc<User>(collection_path + '/' + id)
                .get()
            ).pipe
            (
              map(() =>
              {
                const data = productDocument.data() as User;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
  }

  deleteUser(id: string): Observable<User>
  {
    return this.db.doc<User>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument =>
        {

        }),
        switchMap(productDocument =>
        {
          if (!productDocument || !productDocument.data())
          {
            throw new Error('User not found');
          } else {
            return from
            (
              this.db.doc<User>(collection_path + '/' + id)
                .delete()
            ).pipe
            (
              map(() =>
              {
                const data = productDocument.data() as User;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
  }

  removeUser(id: string)
  {
    this.db.doc<User>(collection_path + '/' + id)
      .delete();
  }
}
