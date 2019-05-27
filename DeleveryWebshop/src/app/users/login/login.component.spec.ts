import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {of} from 'rxjs';
import {ShowUsersComponent} from '../show-users/show-users.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {UserService} from '../../shared/service/user.service';
import {DOMHelper} from '../../../testing/DOMHelper';

import * as firebase from 'firebase';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let afAuthMock: any;
  beforeEach(async(() =>
  {
    afAuthMock = {};
    afAuthMock.auth = jasmine.createSpyObj('auth',
      ['signInWithEmailAndPassword']);

    afAuthMock.auth.signInWithEmailAndPassword.and.returnValue(of([]).toPromise());
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      ],
      providers: [
        {provide: AngularFireAuth, useValue: afAuthMock}
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Simple HTML', () =>
  {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('Login', () =>
  {
    beforeEach(() => {
    component.Login();
  });
    it('should call auth.signInWithEmailAndPassword', () => {
      expect(afAuthMock.auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });

});
