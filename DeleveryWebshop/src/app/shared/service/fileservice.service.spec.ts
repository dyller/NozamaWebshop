import {getTestBed, TestBed} from '@angular/core/testing';

import { FileService } from './file.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ProductService} from "./product.service";
import {defer, of} from "rxjs";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {FileMetadata} from "../entities/file-metadata";

describe('FileService', () => {
  let angularFirestoreMock: any;
  let dbMock: any;
  let dbMockRef: any;
  let httpMock: HttpTestingController;
  let service: FileService;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['createId']);

    dbMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    dbMockRef = jasmine.createSpyObj('ref', ['getDownloadURL']);
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
    describe('getProductsCalls', () => {
      beforeEach(() => {
        service.upload(new File(
          [null],
          null
          , {type: null}));
      });
      it('created by id', () => {
        expect(angularFirestoreMock.createId).toHaveBeenCalledTimes(1);

      });

  });
});
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
