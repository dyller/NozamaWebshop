import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {ImageMetadata} from '../entities/image-metadata';
import {FileMetadata} from '../entities/file-metadata';
import {defer, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) {}

  /*uploadImage(imageMetadata: ImageMetadata): Observable<FileMetadata> {
    if (imageMetadata.imageBlob) {
      return this.createImage(imageMetadata);
    }
  }
  createImage(imageMetadata: ImageMetadata): Observable<FileMetadata> {
    const fileToUpload = new File(
      [imageMetadata.imageBlob],
      imageMetadata.fileMeta.name
      , {type: imageMetadata.fileMeta.type});
    return this.upload(fileToUpload);
  }


  upload(file: File): Observable<FileMetadata> {
    const uid = this.db.createId();
      return defer(() =>
          this.storage.ref('product-pictures/' + uid)
          .put(file, {
            customMetadata: {
              originalName: file.name
            }
          })
          .then()
        ).pipe(
          map(fileRef => {
            fileRef.id = uid;
            return fileRef;
          })
        );
  }
*/
  getFileUrl(id: string): Observable<any> {
    return this.storage.ref('product-pictures/' + id)
      .getDownloadURL();
  }
}
