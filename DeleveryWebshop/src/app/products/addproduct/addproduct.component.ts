import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {FileService} from '../../shared/service/file.service';
import {switchMap} from 'rxjs/operators';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  imageChangedEvent: any = '';
  private fileToUpload: File;
  productFormGroup: FormGroup;
  croppedImage: any = '';
  products: Observable<any>;
  constructor (
    private fs: FileService) {

    this.productFormGroup = new FormGroup({
      message: new FormControl('')
    });
    /* this.fs.getAllProduct().subscribe(product => {
       this.products = product;
     });*/
  }

  ngOnInit() {
  }
  uploadFile(event) {
    this.imageChangedEvent = event;
    // this.fileToUpload = event.target.files[0];
    //this.fs.upload(file).subscribe();
  }

  addProduct() {
    const imageData = this.productFormGroup.value;
    this.fs.upload(this.fileToUpload).
    pipe(
      switchMap( metaData => {
        imageData.id = metaData.id;
        return this.fs.addImage(imageData);
      })
    ).subscribe();

  }
  imageCropped(event: ImageCroppedEvent) {
    const beforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File([event.file], beforeCrop.name,
      {type: beforeCrop.type});
  }

}
