import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { CartService } from './cart.service';
import {AddproductComponent} from '../../products/addproduct/addproduct.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {Store} from '@ngxs/store';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FileService} from "./file.service";
import * as firebase from "firebase";


describe('CartService', () => {
  let service: CartService;
  let db: any;
  let json: any;
  let fire: any;
  let fireAuth: any;
  let fireUid: any;
  beforeEach(() => {
    db = jasmine.createSpyObj('AngularFirestore', ['collection']);
    json = jasmine.createSpyObj('JSON', ['parse']);
    fire = jasmine.createSpyObj('firebase', ['auth']);
    fireAuth = jasmine.createSpyObj('auth', ['currentUser']);
    fire.auth.and.returnValue(fireAuth);
    fireUid = jasmine.createSpyObj('currentUser', ['uid']);
    fireAuth.currentUser.and.returnValue(fireUid);
    fireUid.uid.and.returnValue('test');
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: db},
        {provide: JSON, useValue: json},
        {provide: firebase, useValue: fire}
       // {provide: window.sessionStorage, useValue: sess}

      ]
    });
    service = TestBed.get(CartService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /*describe('add', () => {
    beforeEach(() => {
      service = TestBed.get(CartService);
      service.addToFB(  [{id: 'product1', amount: 1, pictureId: 'picture'
        , name: 'product', url: 'image', price: 300}]);
    });
    it('should call collection with "url" as param', () => {
      expect(fireUid.uid).toHaveBeenCalledTimes(1);
    });
    });*/

});

