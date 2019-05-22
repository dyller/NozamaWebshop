import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FileService} from './file.service';
import {Product} from '../entities/product';
import {ImageMetadata} from '../entities/image-metadata';
import {from, Observable, throwError} from 'rxjs';
import {catchError, first, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';

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
      console.log('The add product with image is starting');
      if (imageMeta && imageMeta.fileMeta
      && imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image))
    {
        const endPoint = 'https://us-central1-nozama-58c5d.cloudfunctions.net/products';
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

  updateProduct(prodData: Product) {
    console.log('updateProductService, update product starting');
    console.log('What is the prodData.name in updateProduct service: ' + prodData.name);
    try{
      this.db.collection(collection_path).doc(prodData.id).update(
        {

          name: prodData.name
        }
      );
    }catch (e) {
      console.log('Error with updating the product in the service: ' + e);
    }
  }

  getProductById(id: string): Observable<Product> {
    console.log('What is the id: ' + id);
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
    console.log('deleteProd in prodService, id: ' + id);
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
