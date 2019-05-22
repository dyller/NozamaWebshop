import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproductComponent } from './showproduct.component';
import {AddproductComponent} from '../addproduct/addproduct.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../../shared/service/product.service';
import {FileService} from '../../shared/service/file.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CartService} from '../../shared/service/cart.service';
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

describe('ShowproductComponent', () => {
  let component: ShowproductComponent;
  let dh: DOMHelper<ShowproductComponent>;
  let fixture: ComponentFixture<ShowproductComponent>;
  let productServiceMock: any;
  let fileServiceMock: any;
  let fe: any;
  let fsAuth: any
  let productCart: any
  let something: any
  beforeEach(async(() => {
    fe = jasmine.createSpyObj('firebase', ['auth']);
     fsAuth = jasmine.createSpyObj('auth', ['signOut']);
    fe.auth.and.returnValue(fsAuth);
   fsAuth.signOut.and.returnValue(of([]));

    productServiceMock = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    productServiceMock.getProducts.and.returnValue(of([]));
    something = jasmine.createSpyObj('deleteProduct', ['subscribe']);
    productServiceMock.deleteProduct.and.returnValue(something);

    fileServiceMock = jasmine.createSpyObj('ProductService', ['getFileUrl']);
    fileServiceMock.getFileUrl.and.returnValue(of([]));
    productCart = jasmine.createSpyObj('CartService', ['add']);
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
        {provide: firebase, useValue: fe},
        {provide: ProductService, useValue: productServiceMock},
        {provide: FileService, useValue: fileServiceMock},
        {provide: CartService, useValue: productCart}
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

    it('Should show one list item when I have one product', () => {
      component.products = helper.getProducts(1);
      fixture.detectChanges();
      expect(dh.count('mat-card-header')).toBe(1);
    });

    it('Should show 100 list item when I have 100 products mat-card-header ', () => {
      component.products = helper.getProducts(100);
      fixture.detectChanges();
      expect(dh.count('mat-card-header')).toBe(100);
    });
    it('Should show 100 Delete buttons, 1 pr. item', () => {
      component.products = helper.getProducts(100);
      fixture.detectChanges();
      expect(dh.countText('button', 'Delete')).toBe(100);
    });


    it('Should show 1 product name in mat-card-header', () => {
      component.products = helper.getProducts(1);
      fixture.detectChanges();
      expect(dh.singleText('mat-card-header'))
        .toContain(helper.products[0].name);
    });

    it('Should show 5 mat-card-header, 1 pr. product', () => {
      component.products = helper.getProducts(5);
      fixture.detectChanges();
      expect(dh.count('mat-card-header')).toBe(5);
    });
    it('Should not show img tag when product does not have pictureId and is loaded async from ProductService',
      () => {
        productServiceMock.getProducts.and.returnValue(helper.getProducts(1));
        helper.products[0].url = undefined;
        fixture.detectChanges();
        expect(dh.count('img')).toBe(0);
      });
  });

  describe('logout', () => {
    beforeEach(() => {
      component.productToCart({id: 'product1', amount: 1, pictureId: 'picture'
        , name: 'product', url: 'image', price: 300});
    });
    it('should call logout 1 time', () => {
      expect(productCart.add).toHaveBeenCalledTimes(1);
    });
  });
  describe('delete', () => {
    beforeEach(() => {
      component.deleteProduct({id: 'product1', amount: 1, pictureId: 'picture'
        , name: 'product', url: 'image', price: 300});
    });
    it('should call ps.deleteProduct 1 time', () => {
      expect(productServiceMock.deleteProduct).toHaveBeenCalledTimes(1);
    });
  });
  describe('logout', () => {
    beforeEach(() => {
      component.logut();
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
