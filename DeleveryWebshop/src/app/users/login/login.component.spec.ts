import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {of} from 'rxjs';
import {ShowUsersComponent} from '../show-users/show-users.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
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
  let fire: any;
  let fireAuth: any;
  beforeEach(async(() =>
  {
    fire = jasmine.createSpyObj('firebase', ['auth']);
    fireAuth = jasmine.createSpyObj('auth', ['signInWithEmailAndPassword']);
    fire.auth.and.returnValue(fireAuth);
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
        {provide: firebase, useValue: fire}
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

});
