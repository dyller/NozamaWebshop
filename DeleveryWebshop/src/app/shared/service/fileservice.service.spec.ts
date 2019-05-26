import {getTestBed, TestBed} from '@angular/core/testing';

import { FileService } from './file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';

describe('FileService', () => {
  let angularFirestoreMock: any;
  let dbMock: any;
  let dbMockRef: any;
  let httpMock: HttpTestingController;
  let service: FileService;
  let downRef: any;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['createId']);

    dbMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    dbMockRef = jasmine.createSpyObj('ref', ['getDownloadURL', 'put']);
    downRef = jasmine.createSpyObj('put', ['then']);
    dbMockRef.put.and.returnValue(downRef);
    dbMock.ref.and.returnValue(dbMockRef);
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireStorage, useValue: dbMock}

      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FileService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getProductsCalls', () => {
    beforeEach(() => {
      service.getFileUrl('test');
    });
      it('should call ref', () => {
        expect(dbMock.ref).toHaveBeenCalledTimes(1);

      });
      it('should call collection with "url" as param', () => {
        expect(dbMock.ref).toHaveBeenCalledWith('product-pictures/test');
      });
      it('should call getDownloadURL', () => {
        expect(dbMockRef.getDownloadURL).toHaveBeenCalledTimes(1);

      });
  });
   /* describe('getProductsCalls', () => {
      beforeEach(() => {
        service.upload(new File(
          [null],
          null
          , {type: null}));
      });
      it('created by id', () => {
        expect(angularFirestoreMock.createId).toHaveBeenCalledTimes(1);

      });*/
      /*it('then called', () => {
        expect(dbMockRef.put).toHaveBeenCalledTimes(1);

      });*/
   /* });*/
     /* describe('getProductsCalls', () => {
        beforeEach(() => {
          service.createImage(null);

        });

        it('created by id', () => {
          expect(File).toHaveBeenCalledTimes(null);
        });
  });*/

});
