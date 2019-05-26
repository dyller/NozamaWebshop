import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {getTestBed, TestBed} from "@angular/core/testing";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {Store} from "@ngxs/store";
import * as firebase from "firebase";

describe('AuthService', () => {

  let store: any;
  let firebaseUser: any;
  let firebasecreate: any;
  let httpMock: HttpTestingController;
  let service: AuthService;
  let fireThen: any;
  beforeEach(() => {

    store = jasmine.createSpyObj('Store', ['dispatch']);
    firebaseUser = jasmine.createSpyObj('firebase', ['auth']);
    firebasecreate = jasmine.createSpyObj('auth', ['createUserWithEmailAndPassword']);
    firebaseUser.auth.and.returnValue(firebasecreate);
    fireThen = jasmine.createSpyObj('createUserWithEmailAndPassword', ['then']);
    firebasecreate.createUserWithEmailAndPassword.and.returnValue(fireThen)
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
     {provide: Store, useValue: store},
        {provide: firebase, useValue: firebaseUser}
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
     it('should call ps.deleteProduct 1 time', () =>
    {
      expect(firebasecreate.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
      it('should call ps.deleteProduct 1 time', () =>
      {
        expect(firebasecreate.createUserWithEmailAndPassword).toHaveBeenCalledWith(null);
      });

    it('should call ps.deleteProduct 1 time', () =>
    {
      expect(fireThen.then).toHaveBeenCalledTimes(1);
    });
  });

});
