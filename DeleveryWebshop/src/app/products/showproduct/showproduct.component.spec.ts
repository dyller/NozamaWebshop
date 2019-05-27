import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproductComponent } from './showproduct.component';
import {AddproductComponent} from '../addproduct/addproduct.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../../shared/service/product.service';
import {FileService} from '../../shared/service/file.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Product} from '../../shared/entities/product';
import {ImageMetadata} from '../../shared/entities/image-metadata';
import {Observable, of} from 'rxjs';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {By} from '@angular/platform-browser';
import {DOMHelper} from '../../../testing/DOMHelper';
import {Store} from '@ngxs/store';
import {store} from '@angular/core/src/render3';

describe('ShowproductComponent', () => {
  let component: ShowproductComponent;
  let dh: DOMHelper<ShowproductComponent>;
  let fixture: ComponentFixture<ShowproductComponent>;
  let productServiceMock: any;
  let fileServiceMock: any;
  let str: any;
  let fe: any;
  let fsAuth: any;
  let productCart: any;
  let something: any;
  let afAuthMock: any;
  beforeEach(async(() => {
    str = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    fe = jasmine.createSpyObj('AngularFireAuth', ['auth']);
    fsAuth = jasmine.createSpyObj('auth', ['signOut']);
    fe.auth.and.returnValue(fsAuth);
    fsAuth.signOut.and.returnValue(of([]));

    str = jasmine.createSpyObj('Store', ['dispatch']);
    something = jasmine.createSpyObj('deleteProduct', ['store']);
    str.dispatch.and.callThrough(something);


    productServiceMock = jasmine.createSpyObj('store', ['dispatch']);

    fileServiceMock = jasmine.createSpyObj('ProductService', ['getFileUrl']);
    fileServiceMock.getFileUrl.and.returnValue(of([]));
    productCart = jasmine.createSpyObj('CartService', ['add']);

    afAuthMock = {};
    afAuthMock.auth = jasmine.createSpyObj('auth',
      ['signOut']);

    afAuthMock.auth.signOut.and.returnValue(of([]).toPromise());
    TestBed.configureTestingModule({
      declarations: [ShowproductComponent],
      imports: [ReactiveFormsModule,
        RouterTestingModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      ],
      providers: [
        {provide: Store, useValue: str},
        {provide: AngularFireAuth, useValue: afAuthMock},
        {provide: ProductService, useValue: productServiceMock},
        {provide: FileService, useValue: fileServiceMock},
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ShowproductComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });


  describe('deleteProduct', () => {
    beforeEach(() => {
      component.deleteProduct(
        {id: 'product1', amount: 1, pictureId: 'picture'
          , name: 'product', url: 'image', price: 300}
    );
    });

    it('should call store dispath', () => {
        expect(str.dispatch).toHaveBeenCalledTimes(2);
    });
  });
  describe('productToCart', () => {
    beforeEach(() => {
      component.productToCart(
        {id: 'product1', amount: 1, pictureId: 'picture'
          , name: 'product', url: 'image', price: 300}
      );
    });

    it('should call store dispath', () => {
      expect(str.dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('Simple HTML', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    // Simple HTML
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contain an h2 tag', () => {
      expect(dh.singleText('h2')).toBe('List all Products');
    });

    it('Should minimum be one button on the page', () => {
      expect(dh.count('button')).toBeGreaterThanOrEqual(1);
    });

    it('Should be a + button first on the page', () => {
      expect(dh.singleText('button')).toBe('+');
    });
  });
  describe('List Products', () => {
      let helper: Helper;
      beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });
    it('List all Products h2 tag', () => {
      expect(dh.count('h2')).toBe(1);
    });

    it('Should show no list item when no products are available', () => {
      expect(dh.count('li')).toBe(0);
    });

    });

  describe('delete', () => {
    beforeEach(() =>
    {
      component.deleteProduct({id: 'product1', amount: 1, pictureId: 'picture'
        , name: 'product', url: 'image', price: 300});
    });

    /*it('should call ps.deleteProduct 1 time', () => {
      expect(str.dispatch).toHaveBeenCalledTimes(1);
    });*/
  });
  
  describe('logout', () => {
    beforeEach(() => {
      component.logut();
    });
    it('auth sigout', () => {
      expect(afAuthMock.auth.signOut).toHaveBeenCalledTimes(1);
    });
  });
});

class Helper {
  products: Product[] = [];
  getProducts(amount: number): Observable<Product[]> {
    for (let i = 0; i < amount; i++) {
      this.products.push(
        {id: 'product1', amount: 1, pictureId: 'picture'
          , name: 'product', url: 'image', price: 300}
      );
    }
    return of(this.products);
  }
}
