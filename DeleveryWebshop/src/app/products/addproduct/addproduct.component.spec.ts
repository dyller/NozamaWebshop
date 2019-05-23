import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductComponent } from './addproduct.component';
import {UpdateProductsComponent} from '../update-products/update-products.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../../shared/service/product.service';
import {Product} from '../../shared/entities/product';
import {ImageMetadata} from '../../shared/entities/image-metadata';
import {Observable, of} from 'rxjs';
import {Store} from '@ngxs/store';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientModule} from '@angular/common/http';

describe('AddproductComponent', () =>
{
  let component: AddproductComponent;
  let fixture: ComponentFixture<AddproductComponent>;
  let str: any;
  let something: any;

  beforeEach(async(() =>
  {
    str = jasmine.createSpyObj('Store', ['dispatch']);
    something = jasmine.createSpyObj('addProduct', ['store']);
    str.dispatch.and.callThrough(something);

    TestBed.configureTestingModule({
      declarations: [ AddproductComponent ],
      imports: [ ReactiveFormsModule,
        ImageCropperModule,
        HttpClientModule,
        RouterTestingModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule // imports firebase/firestore, only needed for database features
      ],
      providers: [
        {provide: Store, useValue: str}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('AddProduct Add', () => {
    beforeEach(() =>
    {
      component.addProduct();
    });

    it('should call the store 1 time', () =>
    {
      expect(str.dispatch).toHaveBeenCalledTimes(1);
    });
  });


});
