import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProductService} from '../service/product.service';
import {of} from 'rxjs';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {Store} from '@ngxs/store';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NvbarComponent} from '../nvbar/nvbar.component';

describe('AuthService', () => {

  let component: AuthService;
  let fixture: ComponentFixture<AuthService>;
  let store: any;
  let firebaseUser: any;
  let firebasedelete: any;
  let httpMock: HttpTestingController;
  let service: AuthService;
  beforeEach(() => {

    store = jasmine.createSpyObj('Store', ['dispatch']);
    firebaseUser = jasmine.createSpyObj('firebase', ['auth']);
    firebasedelete = jasmine.createSpyObj('auth', ['createUserWithEmailAndPassword']);
    firebaseUser.auth.and.returnValue(firebasedelete);

    TestBed.configureTestingModule({
      declarations: [ AuthService ],
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [
        {provide: Store, useValue: store},
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
  expect(service).toBeTruthy();
  });

  describe('Simple HTML', () => {
    beforeEach(() =>
    {
      service.createUser(null, null);
      it('should call ps.deleteProduct 1 time', () =>
      {
        expect(firebasedelete.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('delete account', () => {

  });
});
