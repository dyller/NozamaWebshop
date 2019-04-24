import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FileService} from './file.service';
import {Product} from '../entities/product';
import {ImageMetadata} from '../entities/image-metadata';
import {from, Observable, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

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

}
