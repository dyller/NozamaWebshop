import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import {Observable, of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CartService} from '../../shared/service/cart.service';
import {HttpClientModule} from '@angular/common/http';
import {DOMHelper} from '../../../testing/DOMHelper';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Product} from '../../shared/entities/product';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let dh: DOMHelper<OrderComponent>;
  let productCart: any;
  beforeEach(async(() => {
    productCart = jasmine.createSpyObj('CartService', ['getAllProduts', 'addToFB']);
    productCart.getAllProduts.and.returnValue([]);
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports: [
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
        {provide: CartService, useValue: productCart}
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
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

    it('should contain an div tag with Order list', () => {
      expect(dh.singleText('div')).toBe('Order list');
    });

    it('Should minimum be one button on the page', () => {
      expect(dh.count('button')).toBeGreaterThanOrEqual(1);
    });

    it('Should be a Buy button first on the page', () => {
      expect(dh.singleText('button')).toBe('Buy');
    });
  });
  describe('productcart Add to fB', () => {
    beforeEach(() => {
     /* productCart.addToFB([{id: 'product1', amount: 1, pictureId: 'picture'
        , name: 'product', url: 'image', price: 300}]);*/
     component.buyProducts();
    });
    it('Should call addtoFB 1 time', () => {
      expect(productCart.addToFB).toHaveBeenCalledTimes(1);
    });
  });
});

