import { Injectable } from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {first, map, switchMap, tap} from 'rxjs/operators';
import {User} from '../entities/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {ImageMetadata} from '../entities/image-metadata';

const   collection_path = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore,
              private http: HttpClient) { }

  addUser(userData: User, imgMeta: ImageMetadata): Observable<User> {
    console.log('Jacob is a cat');
    if (userData && userData.Username && userData.Address && userData.Email )
    {
      console.log('Jacob is a bear');
      const endPoint = 'https://us-central1-nozama-58c5d.cloudfunctions.net/users';

      const userToCreate: any =
      {
        id: userData.id,
        Username: userData.Username,
        Address: userData.Address,
        Email: userData.Email,
        Phonenumber: userData.Phonenumber,
        Password: userData.Password,
        image:
          {
            base64: imgMeta.base64Image,
            name: imgMeta.fileMeta.name,
            type: imgMeta.fileMeta.type,
            size: imgMeta.fileMeta.size
          }
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
        Username: userData.Username
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
              Username: data.Username,
              Password: data.Password,
              Address: data.Address,
              Phonenumber: data.Phonenumber,
              Email: data.Email
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
