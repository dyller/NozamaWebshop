import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {of} from 'rxjs';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {User} from '../entities/user';
import * as firebase from "firebase";


describe('UserService', () => {
  let angularFirestoreMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: UserService;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'delete']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(UserService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getUsers', () => {
    beforeEach(() => {
      service.getUsers();

    });

    it('should call collection 1 time on AngularFirestore service', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });

   /* it('should call collection with "User" as param', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledWith('user');
    });*/

    it('should call snapshotChanges 1 time on AngularFirestore service', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });

});
