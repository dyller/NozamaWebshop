import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FileService} from './file.service';
import {Product} from '../entities/product';
import {ImageMetadata} from '../entities/image-metadata';
import {from, Observable, throwError} from 'rxjs';
import {catchError, first, map, switchMap, tap} from 'rxjs/operators';
const collection_path = 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore,
              private fs: FileService) {}

  addProductWithImage(product: Product, imageMeta: ImageMetadata)
    : Observable<Product> {
    if (imageMeta && imageMeta.fileMeta
      && imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image)) {
      return this.fs.uploadImage(imageMeta)
        .pipe(
          switchMap(metadata => {
            product.pictureId = metadata.id;
            return this.addProduct(product);
          }),
          catchError((err, caught) => {
            return throwError(err);
          })
        );
    } else {
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
