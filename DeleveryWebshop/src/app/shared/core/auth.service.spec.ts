import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {getTestBed, TestBed} from "@angular/core/testing";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {Store} from "@ngxs/store";
import * as firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {of} from "rxjs";

describe('AuthService', () => {

  let store: any;
  let firebaseUser: any;
  let firebasecreate: any;
  let httpMock: HttpTestingController;
  let service: AuthService;
  let fireThen: any;
  let afAuthMock: any;
  beforeEach(() => {

    store = jasmine.createSpyObj('Store', ['dispatch']);
    firebaseUser = jasmine.createSpyObj('firebase', ['auth']);
    firebasecreate = jasmine.createSpyObj('auth', ['createUserWithEmailAndPassword']);
    firebaseUser.auth.and.returnValue(firebasecreate);
    fireThen = jasmine.createSpyObj('createUserWithEmailAndPassword', ['then']);
    firebasecreate.createUserWithEmailAndPassword.and.returnValue(fireThen);
    afAuthMock = {};
    afAuthMock.auth = jasmine.createSpyObj('auth',
      ['createUserWithEmailAndPassword']);


    afAuthMock.auth.createUserWithEmailAndPassword.and.returnValue(of([]).toPromise());
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
     {provide: Store, useValue: store},
        {provide: AngularFireAuth, useValue: afAuthMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
  expect(service).toBeTruthy();
  });

  describe('create user', () => {
    beforeEach(() =>
    {
      service.createUser({id: 'user1',
      Username: 'Steve',
      Password: 'jkahdkjsandjksa',
      Address: 'Esbjerg',
      Phonenumber: '56567899',
      PictureId: 'happy-face.png',
      Email: 'steve@steve.com'}, {base64Image: null,
      imageBlob: null,
      fileMeta: null});
    });
     it('should call auth createUserWithEmailAndPassword 1 time', () =>
    {
      expect(afAuthMock.auth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
   /* it('should call store.dispatch 1 time', () =>
    {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });*/
  });

  describe('delete user', () => {
    beforeEach(() =>
    {
      service.deleteAccount({id: 'user1',
        Username: 'Steve',
        Password: 'jkahdkjsandjksa',
        Address: 'Esbjerg',
        Phonenumber: '56567899',
        PictureId: 'happy-face.png',
        Email: 'steve@steve.com'});
    });
    it('should call store.dispatch 1 time', () =>
    {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
