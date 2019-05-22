import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsComponent } from './update-products.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ProductService} from '../../shared/service/product.service';
import {FileService} from '../../shared/service/file.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';
import {Store} from '@ngxs/store';

describe('UpdateProductsComponent', () => {
  let component: UpdateProductsComponent;
  let fixture: ComponentFixture<UpdateProductsComponent>;
  let fsMock: any;
  let psMock: any;
  let psMockSub: any;
  let fsMockSub: any;
  let str: any;

  beforeEach(async(() => {
    psMock = jasmine.createSpyObj('ProductService', ['getProductById', 'updateProduct']);
    psMockSub = jasmine.createSpyObj('getProductById', ['subscribe']);

    str = jasmine.createSpyObj('store', ['dispatch']);

    psMock.getProductById.and.returnValue(psMockSub);
    psMockSub.subscribe.and.returnValue(of({id: 'product1', amount: 1, pictureId: 'picture'
      , name: 'product', url: 'image', price: 300}));
    fsMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    fsMockSub = jasmine.createSpyObj('getFileUrl', ['subscribe']);
    fsMock.getFileUrl.and.returnValue(fsMockSub);

    TestBed.configureTestingModule({
      declarations: [ UpdateProductsComponent ],
      imports: [ ReactiveFormsModule,
        RouterTestingModule
      ],
      providers:
      [
        {provide: Store, useValue: str},
        {provide: FileService, useValue: fsMock},
        {provide: ProductService, useValue: psMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('UpdateProduct Update', () => {
    beforeEach(() => {
      component.updateProduct();
    });
    /*it('should call prodService.updateProduct 1 time', () => {
      expect(psMockSub.subscribe).toHaveBeenCalledTimes(1);
    });*/
  });

  describe('UpdateProduct ngOnInit', () => {
    beforeEach(() => {
    });
    it('should call productService.getFileUrl 1 time', () => {
      expect(psMockSub.subscribe).toHaveBeenCalledTimes(1);
    });

  });
});
