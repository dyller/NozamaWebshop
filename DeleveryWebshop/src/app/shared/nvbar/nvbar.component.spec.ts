import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvbarComponent } from './nvbar.component';
import {CartService} from '../service/cart.service';
import {UserService} from '../service/user.service';
import {AuthService} from '../core/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Product} from "../entities/product";
import {Store} from "@ngxs/store";
import * as firebase from "firebase";

describe('NvbarComponent', () => {

  let component: NvbarComponent;
  let fixture: ComponentFixture<NvbarComponent>;
  let cart: any;
  let user: any;
  let cartWatch: any;
  let auth: any;
  let fires: any
  let fireAuth: any
  beforeEach(async(() => {
    fires = jasmine.createSpyObj('firebase', ['auth']);
    fireAuth = jasmine.createSpyObj('auth', ['onAuthStateChanged']);
    fires.auth.and.returnValue(fireAuth);
    fireAuth.onAuthStateChanged.and.returnValue('asd');
    cart = jasmine.createSpyObj('CartService', ['getAllProduts', 'watchStorage']);
    user = jasmine.createSpyObj('UserService', ['getUserById']);
    cartWatch = jasmine.createSpyObj('watchStorage', ['subscribe']);
    //psMockSub = jasmine.createSpyObj('store', ['dispatch']);
    cart.watchStorage.and.returnValue(cartWatch);

    auth = jasmine.createSpyObj('AuthService', ['deleteAccount']);

    TestBed.configureTestingModule({
      declarations: [ NvbarComponent ],
      imports: [ ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule // imports firebase/firestore, only needed for database features
      ],
      providers: [
        {provide: CartService, useValue: cart},
        {provide: UserService, useValue: user},
        {provide: AuthService, useValue: auth},
        {provide: firebase, useValue: fires}
        //{provide: ProductService, useValue: psMock}
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('delete account', () => {
    beforeEach(() =>
    {
      component.deleteAccount();
    });

    it('should call authService.deleteAccount', () => {
      expect(auth.deleteAccount).toHaveBeenCalledTimes(1);
    });
  });
  /*  describe('nginit', () => {
     beforeEach(() =>
     {
     });
  /*  it('should call fireAuth', () => {
       expect(user.getUserById).toHaveBeenCalledTimes(1);
     });
   });*/
});
