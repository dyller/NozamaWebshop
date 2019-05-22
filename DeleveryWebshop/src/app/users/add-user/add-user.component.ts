import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageMetadata} from '../../shared/entities/image-metadata';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {UserService} from '../../shared/service/user.service';
import * as firebase from 'firebase';
import {Store} from "@ngxs/store";
import {AddUser} from "../../shared/statemangement/action/user.actions";
import {AuthService} from "../../shared/core/auth.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  constructor (private router: Router,
               private activatedRoute: ActivatedRoute,
               private us: UserService,
               private authServer: AuthService) {

    this.userFormGroup = new FormGroup({
      Username: new FormControl(''),
      Password: new FormControl(''),
      Address: new FormControl(''),
      Email: new FormControl(''),
      Phonenumber: new FormControl('')
    });
  }


  ngOnInit() {
  }

  addUser() {
    const userData = this.userFormGroup.value;
    this.authServer.createUser(userData,
      this.getMetaDataForImage()
    );
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

  uploadFile($event: Event)
  {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent)
  {
    // Preview
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }
}
