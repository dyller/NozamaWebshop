import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import {ShowUsersComponent} from "../show-users/show-users.component";
import {DOMHelper} from "../../../testing/DOMHelper";
import {of} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {ProductService} from "../../shared/service/product.service";
import {UserService} from "../../shared/service/user.service";
import {AuthService} from "../../shared/core/auth.service";

describe('AddUserComponent', () => {

  let component: AddUserComponent;
  let dh: DOMHelper<AddUserComponent>;
  let fixture: ComponentFixture<AddUserComponent>;
  let userServiceMock: any;
  let authServiceMock: any;
  let addUser: any;

  beforeEach(async(() =>
  {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    authServiceMock = jasmine.createSpyObj('authSerice', ['createUser']);
    userServiceMock.getUsers.and.returnValue(of([]));
    addUser = jasmine.createSpyObj('addUser', ['subscribe']);
    addUser.addUser.and.returnValue(addUser);

    /*fileServiceMock = jasmine.createSpyObj('UserService', ['getFileUrl']);
    fileServiceMock.getFileUrl.and.returnValue(of([]));*/

    //productCart = jasmine.createSpyObj('CartService', ['add']);

    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
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
        {provide: UserService, useValue: userServiceMock},
        {provide: AuthService, useValue: authServiceMock}
        //{provide: FileService, useValue: fileServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  describe('Simple HTML', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contain a label',  () =>
    {
      expect(dh.count('label')).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Button pressed calls', () =>
  {

  });
});
