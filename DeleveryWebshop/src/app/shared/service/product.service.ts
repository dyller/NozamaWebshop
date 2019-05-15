import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FileService} from './file.service';
import {Product} from '../entities/product';
import {ImageMetadata} from '../entities/image-metadata';
import {from, Observable, throwError} from 'rxjs';
import {catchError, first, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

const collection_path = 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore,
              private fs: FileService,
              private http: HttpClient) {}

  addProductWithImage(product: Product, imageMeta: ImageMetadata): Observable<Product>
  {
    if (imageMeta && imageMeta.fileMeta
      && imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image))
    {
        const endPoint = 'https://us-central1-nozamaandroid.cloudfunctions.net/products';
        const productToSend: any =
        {
          name: product.name,
          image:
          {
            base64: imageMeta.base64Image,
            name: imageMeta.fileMeta.name,
            type: imageMeta.fileMeta.type,
            size: imageMeta.fileMeta.size
          }
        };
        return this.http.post<Product>(endPoint, productToSend);
    }
    else
    {
      return throwError('You need better metadata');
    }
  }

  private addProduct(product: Product): Observable<Product> {
    return from(
      this.db.collection('products').add(
        {
          name: product.name,
          pictureId: product.pictureId
        }
      )
    ).pipe(
        map(productRef => {
        product.id = productRef.id;
        return product;
      })
    );
  }

  updateProduct(prodData: Product) {
    this.db.collection(collection_path).doc(prodData.id).update(
      {
        name: prodData.name
      }
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.db.doc<Product>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(() => {
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            throw new Error('Product not found');
          } else {
            return from(
              this.db.doc<Product>(collection_path + '/' + id)
                .get()
            ).pipe(
              map(() => {
                const data = productDocument.data() as Product;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
  }

  getProducts(): Observable<Product[]> {
    return this.db
      .collection<Product>(collection_path)
      // This will return an Observable
      .snapshotChanges()
      .pipe(
        map(actions => {
          // actions is an array of DocumentChangeAction
          return actions.map(action => {
            const data = action.payload.doc.data() as Product;
            return {
              id: action.payload.doc.id,
              price: data.price,
              name: data.name,
              amount: data.amount,
              pictureId: data.pictureId
            };
          });
        })
      );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.db.doc<Product>(collection_path + '/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            throw new Error('Product not found');
          } else {
            return from(
              this.db.doc<Product>(collection_path + '/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = productDocument.data() as Product;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
  }
}
