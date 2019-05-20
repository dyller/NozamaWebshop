import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductsComponent } from './update-products.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ProductService} from "../../shared/service/product.service";
import {FileService} from "../../shared/service/file.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {of} from "rxjs";

describe('UpdateProductsComponent', () => {
  let component: UpdateProductsComponent;
  let fixture: ComponentFixture<UpdateProductsComponent>;
  let fsMock: any;
  let psMock: any;
  let psMockSub: any;
  let fsMockSub: any;
  beforeEach(async(() => {
    psMock = jasmine.createSpyObj('ProductService', ['getProductById', 'updateProduct']);
    psMockSub = jasmine.createSpyObj('getProductById', ['subscribe']);
    psMockSub.subscribe.and.returnValue(of());

    psMock.getProductById.and.returnValue(psMockSub);
    fsMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    fsMockSub = jasmine.createSpyObj('getFileUrl', ['subscribe']);
    fsMock.getFileUrl.and.returnValue(fsMockSub);

    TestBed.configureTestingModule({
      declarations: [ UpdateProductsComponent ],
      imports: [ ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
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
    it('should call prodService.updateProduct 1 time', () => {
      expect(psMockSub.subscribe).toHaveBeenCalledTimes(1);
    });
  });
  describe('UpdateProduct ngOnInit', () => {
    beforeEach(() => {
    });
    it('should call productService.getFileUrl 1 time', () => {
      expect(psMockSub.subscribe).toHaveBeenCalledTimes(1);
    });
    it('should call fs.getFileUrl 0 time', () => {
      expect(fsMockSub.subscribe).toHaveBeenCalledTimes(0);
    });
  });
});
