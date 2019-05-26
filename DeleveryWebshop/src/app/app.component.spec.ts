import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {NvbarComponent} from './shared/nvbar/nvbar.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as firebase from 'firebase';
import {ProductService} from './shared/service/product.service';
import {FileService} from './shared/service/file.service';
import {of} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './shared/service/user.service';
import {AuthService} from './shared/core/auth.service';

describe('AppComponent', () => {
  let productServiceMock: any;
  let fileServiceMock: any;
  let str: any;
  let fe: any;
  let fsAuth: any;
  let productCart: any;
  let something: any;
  let store: Store;
  let cart: any;
  let user: any;
  let cartWatch: any;
  let auth: any;
  beforeEach(async(() => {
    fe = jasmine.createSpyObj('firebase', ['auth']);
    fsAuth = jasmine.createSpyObj('auth', ['signOut']);
    fe.auth.and.returnValue(fsAuth);
    fsAuth.signOut.and.returnValue(of([]));
    cart = jasmine.createSpyObj('CartService', ['getAllProduts', 'watchStorage']);
    user = jasmine.createSpyObj('UserService', ['getUserById']);
    cartWatch = jasmine.createSpyObj('watchStorage', ['subscribe']);
    //psMockSub = jasmine.createSpyObj('store', ['dispatch']);
    cart.watchStorage.and.returnValue(cartWatch);

    auth = jasmine.createSpyObj('AuthService', ['deleteAccount']);

    str = jasmine.createSpyObj('Store', ['dispatch']);
    something = jasmine.createSpyObj('deleteProduct', ['store']);
    str.dispatch.and.callThrough(something);


    productServiceMock = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    productServiceMock.getProducts.and.returnValue(of([]));
    something = jasmine.createSpyObj('deleteProduct', ['subscribe']);
    productServiceMock.deleteProduct.and.returnValue(something);

    fileServiceMock = jasmine.createSpyObj('ProductService', ['getFileUrl']);
    fileServiceMock.getFileUrl.and.returnValue(of([]));
    productCart = jasmine.createSpyObj('CartService', ['add']);

    TestBed.configureTestingModule({
     imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
       HttpClientModule,
       AngularFireStorageModule,
       AngularFireAuthModule,
       MatTooltipModule,
       BrowserAnimationsModule,
       MatButtonModule,
       MatCardModule,
       MatGridListModule,
       ReactiveFormsModule,
      ], providers: [
        {provide: Store, useValue: str},
        {provide: firebase, useValue: fe},
        {provide: ProductService, useValue: productServiceMock},
        {provide: FileService, useValue: fileServiceMock},
        {provide: UserService, useValue: user},
        {provide: AuthService, useValue: auth}
      ],
      declarations: [
        AppComponent,
        NvbarComponent
      ],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  /*

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });*/
  /*
  it(`should have as title 'module-test-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('module-test-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent)
      .toContain('module-test-app');
  });*/
});
