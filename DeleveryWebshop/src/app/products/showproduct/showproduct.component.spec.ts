import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproductComponent } from './showproduct.component';
import {AddproductComponent} from '../addproduct/addproduct.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../../shared/service/product.service';
import {FileService} from '../../shared/service/file.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {CartService} from '../../shared/service/cart.service';
import {Product} from '../../shared/entities/product';
import {ImageMetadata} from '../../shared/entities/image-metadata';
import {Observable, of} from 'rxjs';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {By} from '@angular/platform-browser';
import {DOMHelper} from '../../../testing/DOMHelper';

describe('ShowproductComponent', () => {
  let component: ShowproductComponent;
  let dh: DOMHelper<ProductsListComponent>;
  let fixture: ComponentFixture<ShowproductComponent>;
  let productServiceMock: any;
  beforeEach(async(() => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['getProducts']);
    productServiceMock.getProducts.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ ShowproductComponent ],
      imports: [ ReactiveFormsModule,
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
        {provide: ProductService, useValue: productServiceMock},
        {provide: FileService, useClass: FileServiceStub},
        {provide: CartService, useClass: CartServiceStub}
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
class ProductServiceStub {
  getProducts(): Observable<Product[]> {
    return of([]);
  }
  }
class FileServiceStub {
}
class CartServiceStub {
}
