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
import {ProductService} from '../../shared/service/product.service';
import {UserService} from '../../shared/service/user.service';
import {AuthService} from '../../shared/core/auth.service';
import {ImageCropperModule} from 'ngx-image-cropper';
import {Store} from '@ngxs/store';

describe('AddUserComponent', () => {

  let component: AddUserComponent;
  let dh: DOMHelper<AddUserComponent>;
  let fixture: ComponentFixture<AddUserComponent>;
  let userServiceMock: any;
  //let str: any;
  let authService: any;

  beforeEach(async(() =>
  {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    userServiceMock.getUsers.and.returnValue(of([]));

    authService = jasmine.createSpyObj('authServer', ['createUser']);
    authService.getAllProduts.and.returnValue([]);


    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ImageCropperModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      ],
      providers: [
        {provide: AuthService, useValue: authService},
        {provide: UserService, useValue: userServiceMock}
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


  describe('AddProduct Add', () => {
    beforeEach(() =>
    {
      authService.addUser();
    });

    it('should call the store 1 time', () =>
    {
      expect(authService.addUser).toHaveBeenCalledTimes(1);
    });
  });
});
