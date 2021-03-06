import {getTestBed, TestBed} from '@angular/core/testing';

import { ProductService } from './product.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {of, throwError} from "rxjs";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {FileService} from "./file.service";
import {error} from "selenium-webdriver";
import {HttpClient} from "@angular/common/http";

describe('ProductService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: ProductService;
  let dbColDoc: any;
  let dbPipe: any;
  let httpSpy: any;
  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    dbColDoc = jasmine.createSpyObj('doc', ['update', 'get']);
    dbPipe = jasmine.createSpyObj('get', ['pipe']);
    dbColDoc.get.and.returnValue(dbPipe);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'doc']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    angularFirestoreMock.doc.and.returnValue(dbColDoc);
    fsCollectionMock.doc.and.returnValue(dbColDoc);
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'upload']);

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: FileService, useValue: fileServiceMock},
        {provide: HttpClient, useValue: httpSpy}
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductService);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getProductsCalls', () => {
    beforeEach(() => {
      service.getProducts().subscribe();
    });

    it('should call collection 1 time on AngularFirestore service', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });

    it('should call collection with "products" as param', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledWith('products');
    });

    it('should call snapshotChanges 1 time on AngularFirestore service', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });
  describe('create product', () => {
    beforeEach(() => {
      service.addProductWithImage({name: 'test',
      price: 123,
      category: 'test',
      details: 'test'}, {base64Image: 'test',
        fileMeta: { name: 'test',
          type: 'test',
          size: 123
        }
      });
    });

    it('https post', () => {
      expect(httpSpy.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('addProductWithImage', () => {
    beforeEach(() => {
      service.addProductWithImage( null, null
      ).subscribe();
    });

    it('should not call http post', () => {
      expect(httpSpy.post).toHaveBeenCalledTimes(0);
    });
  });

  describe('update product', () => {
    beforeEach(() => {
      service.updateProduct({id: 'product1', amount: 1, pictureId: 'picture'
        , name: 'product', url: 'image', price: 300});
    });

    it('should call update', () => {
      expect(dbColDoc.update).toHaveBeenCalledTimes(1);
    });

  });
  describe('update product', () => {
    beforeEach(() => {
      service.getProductById('test');
    });

    it('should call update', () => {
      expect(dbColDoc.get).toHaveBeenCalledTimes(1);
    });

  });
  describe('update product', () => {
    beforeEach(() => {
      service.deleteProduct({id: 'product1', amount: 1, pictureId: 'picture'
        , name: 'product', url: 'image', price: 300});
    });

    it('should call update', () => {
      expect(dbColDoc.get).toHaveBeenCalledTimes(1);
    });

  });
});
