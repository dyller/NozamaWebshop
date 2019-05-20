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

describe('AddproductComponent', () => {
  let component: AddproductComponent;
  let fixture: ComponentFixture<AddproductComponent>;
  let psMock: any;
  let psMockSub: any;
  beforeEach(async(() => {
    psMock = jasmine.createSpyObj('ProductService', ['addProductWithImage']);
   psMockSub = jasmine.createSpyObj('addProductWithImage', ['subscribe']);
    psMock.addProductWithImage.and.returnValue(psMockSub);
    TestBed.configureTestingModule({
      declarations: [ AddproductComponent ],
      imports: [ ReactiveFormsModule,
        ImageCropperModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ProductService, useValue: psMock}
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
    beforeEach(() => {
      component.addProduct();
    });
    it('should call ps.deleteProduct 1 time', () => {
      expect(psMockSub.subscribe).toHaveBeenCalledTimes(1);
    });
  });


});

class ProductServiceStub {
  addProductWithImage(product: Product, imageMeta: ImageMetadata)
    : Observable<Product> {
    return null;
  }
}
