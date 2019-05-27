import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {of} from 'rxjs';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {User} from '../entities/user';
import * as firebase from 'firebase';


describe('UserService', () => {
  let angularFirestoreMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: UserService;
  let dbDoc: any;
  let dbGetPipe: any ;
  let dbUpdate: any ;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    dbDoc = jasmine.createSpyObj('doc', ['delete', 'get']);
    dbGetPipe = jasmine.createSpyObj('get', ['pipe']);
    dbDoc.get.and.returnValue(dbGetPipe);
    angularFirestoreMock.doc.and.returnValue(dbDoc);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'delete', 'doc']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    dbUpdate = jasmine.createSpyObj('doc', ['update']);
    fsCollectionMock.doc.and.returnValue(dbUpdate);

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

   /* it('should call collection with "users" as param', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledWith('user');
    });*/

    it('should call snapshotChanges 1 time on AngularFirestore service', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });
  describe('updateUser', () => {
    beforeEach(() => {
      service.updateUser(  {
        id: 'user1',
        Username: 'Steve',
        Password: 'jkahdkjsandjksa',
        Address: 'Esbjerg',
        Phonenumber: '56567899',
        PictureId: 'happy-face.png',
        Email: 'steve@steve.com',
      });

    });

    it('should call db collection', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });
    it('should call db doc', () => {
      expect(fsCollectionMock.doc).toHaveBeenCalledTimes(1);
    });
    it('should call db update', () => {
      expect(dbUpdate.update).toHaveBeenCalledTimes(1);
    });
  });
  describe('updateUser', () => {
    beforeEach(() => {
      service.removeUser(  'test');
    });
    it('should call db collection', () => {
      expect(dbDoc.delete).toHaveBeenCalledTimes(1);
    });

  });
  describe('updateUser', () => {
    beforeEach(() => {
      service.deleteUser(  'test');
    });
    it('should call db collection', () => {
      expect(dbDoc.get).toHaveBeenCalledTimes(1);
    });

  });
  describe('updateUser', () => {
    beforeEach(() => {
      service.getUserById(  'test');
    });
    it('should call db collection', () => {
      expect(dbDoc.get).toHaveBeenCalledTimes(1);
    });

  });


});
