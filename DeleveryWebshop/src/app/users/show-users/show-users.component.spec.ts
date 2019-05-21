import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersComponent } from './show-users.component';
import {DOMHelper} from '../../../testing/DOMHelper';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import * as firebase from "../../products/showproduct/showproduct.component.spec";
import {ProductService} from "../../shared/service/product.service";
import {FileService} from "../../shared/service/file.service";
import {CartService} from "../../shared/service/cart.service";
import {of} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('ShowUsersComponent', () =>
{
  let component: ShowUsersComponent;
  let dh: DOMHelper<ShowUsersComponent>;
  let fixture: ComponentFixture<ShowUsersComponent>;
  let userServiceMock: any;
  //let fileServiceMock: any;
  //let productCart: any
  let something: any

  beforeEach(async(() =>
  {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    userServiceMock.getUsers.and.returnValue(of([]));
    something = jasmine.createSpyObj('deleteUser', ['subscribe']);
    userServiceMock.deleteUser.and.returnValue(something);

    /*fileServiceMock = jasmine.createSpyObj('UserService', ['getFileUrl']);
    fileServiceMock.getFileUrl.and.returnValue(of([]));*/

    //productCart = jasmine.createSpyObj('CartService', ['add']);

    TestBed.configureTestingModule({
      declarations: [ShowUsersComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        MatGridListModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      ],
      providers: [
        //{provide: firebase, useValue: fe},
        {provide: ProductService, useValue: userServiceMock},
        //{provide: FileService, useValue: fileServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  describe('Simple HTML', () =>
  {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should Contain H2 tag', () =>
    {
      expect(dh.singleText('h2')).toBe('List all Users');
    });

    it('Should minimum be one button on the page', () => {
      expect(dh.count('button')).toBeGreaterThanOrEqual(1);
    });

    it('Should be a + button first on the page', () => {
      expect(dh.singleText('button')).toBe('+');
    });
  });

  describe('List Users', () =>
  {
    it('Should List all users', () =>
    {
      expect(dh.count('h2')).toBe(1);
    });

    it('should show no list item when no user is available', ()  =>
    {
      expect(dh.count('li')).toBe(0);
    });

    
  });
});
