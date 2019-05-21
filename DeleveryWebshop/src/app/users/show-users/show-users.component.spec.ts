import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersComponent } from './show-users.component';
import {DOMHelper} from '../../../testing/DOMHelper';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ProductService} from '../../shared/service/product.service';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Product} from "../../shared/entities/product";
import {User} from "../../shared/entities/user";
import * as firebase from "firebase";

describe('ShowUsersComponent', () =>
{
  let component: ShowUsersComponent;
  let dh: DOMHelper<ShowUsersComponent>;
  let fixture: ComponentFixture<ShowUsersComponent>;
  let userServiceMock: any;
  //let fileServiceMock: any;
  //let productCart: any
  let something: any;
  let fe: any;
  let fsAuth: any;

  beforeEach(async(() =>
  {
    fe = jasmine.createSpyObj('firebase', ['auth']);
    fsAuth = jasmine.createSpyObj('auth', ['signOut']);
    fe.auth.and.returnValue(fsAuth);
    fsAuth.signOut.and.returnValue(of([]));

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
        {provide: firebase, useValue: fe},
        {provide: ShowUsersComponent, useValue: userServiceMock},
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
    let helper: Helper;
    beforeEach(() =>
    {
      helper = new Helper();
      fixture.detectChanges();
    });

    it('Should List all users', () =>
    {
      expect(dh.count('h2')).toBe(1);
    });

    it('should show no list item when no user is available', ()  =>
    {
      expect(dh.count('li')).toBe(0);
    });
  });

  describe('Call NgOnInit on Demand', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });

    it('Should call getProducts on the ProductService one time on ngOnInit', () => {
      fixture.detectChanges();
      expect(userServiceMock.getProducts).toHaveBeenCalledTimes(1);
    });

    it('Should show img tag when user with picture is loaded async from ProductService',
      () => {
        userServiceMock.getUsers.and.returnValue(helper.getUsers(1));
        helper.users[0].PictureId = 'happy-face.png';
        fixture.detectChanges();
        expect(dh.count('img')).toBe(1);
      });

    it('Should not show img tag when product does not have pictureId and is loaded async from ProductService',
      () => {
        userServiceMock.getUsers.and.returnValue(helper.getUsers(1));
        helper.users[0].PictureId = undefined;
        fixture.detectChanges();
        expect(dh.count('img')).toBe(0);
      });
  });
});

class Helper {
  users: User[] = [];
  getUsers(amount: number): Observable<User[]> {
    for (let i = 0; i < amount; i++) {
      this.users.push(
        { id: 'user1',
          Username: 'Steve',
          Password: 'jkahdkjsandjksa',
          Address: 'Esbjerg',
          Phonenumber: '56567899',
          PictureId: 'happy-face.png',
          Email: 'steve@steve.com',  }
      );
    }
    return of(this.users);
  }
}
