import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {getTestBed, TestBed} from "@angular/core/testing";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {Store} from "@ngxs/store";

describe('AuthService', () => {

  let store: any;
  let firebaseUser: any;
  let firebasedelete: any;
  let httpMock: HttpTestingController;
  let service: AuthService;
  beforeEach(() => {

    store = jasmine.createSpyObj('Store', ['dispatch']);
    /*firebaseUser = jasmine.createSpyObj('firebase', ['auth']);
    firebasedelete = jasmine.createSpyObj('auth', ['createUserWithEmailAndPassword']);
    firebaseUser.auth.and.returnValue(firebasedelete);*/

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,
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
    /*  it('should call ps.deleteProduct 1 time', () =>
      {
        expect(firebasedelete.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      });*/
    });
  });

  describe('delete account', () => {

  });
});
