import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import {Observable, of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {DOMHelper} from '../../../testing/DOMHelper';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Product} from '../../shared/entities/product';
import {NgxsModule, Select, Store} from "@ngxs/store";
import {CartState} from "../../shared/statemangement/cart/cart.state";
describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let dh: DOMHelper<OrderComponent>;
  let productCart: any;
  let str: any;
  let strDisp: any;
  let store: Store;
  beforeEach(async(() => {
    productCart = jasmine.createSpyObj('CartService', ['getAllProduts', 'addToFB', 'clear']);
    productCart.getAllProduts.and.returnValue([]);
    str = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    strDisp = jasmine.createSpyObj('dispatch', ['subscribe']);
    str.dispatch.and.returnValue(strDisp);
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([CartState]),
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
       {provide: Store, useValue: str}
      ]
    })
      .compileComponents();

    store = TestBed.get(Store);
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

     component.buyProducts();
    });

    it('Should call dispathc subscibe 1 time', () => {
      expect(str.dispatch).toHaveBeenCalledTimes(1);
    });

  });
});

