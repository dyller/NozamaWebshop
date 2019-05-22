import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {FileService} from '../../shared/service/file.service';
import {switchMap} from 'rxjs/operators';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../shared/service/product.service";
import {ImageMetadata} from "../../shared/entities/image-metadata";
import { Store } from '@ngxs/store';
import {AddProduct} from '../statemagnement/product.actions';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  constructor (private router: Router,
               private activatedRoute: ActivatedRoute,
               private ps: ProductService,
               private store: Store) {

    this.productFormGroup = new FormGroup({
      name: new FormControl(''),
      price: new FormControl('')
    });
  }

  ngOnInit() {

  }

  addProduct()   {
    const productData = this.productFormGroup.value;
    this.store.dispatch(new AddProduct(productData,
      this.getMetaDataForImage()
    ));
  }

  private getMetaDataForImage(): ImageMetadata {
    if (this.imageChangedEvent && this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        base64Image: this.croppedImage,
        imageBlob: this.croppedBlob,
        fileMeta: {
          name: fileBeforeCrop.name,
          type: 'image/png',
          size: fileBeforeCrop.size
        }
      };
    }
    return undefined;
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
    // Going away soon.. Bye bye..
    // this.fileToUpload = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }
}
