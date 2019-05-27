import {TestBed, async, ComponentFixture} from '@angular/core/testing';
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
import {AddproductComponent} from "./products/addproduct/addproduct.component";
import {ImageCropperModule} from "ngx-image-cropper";

describe('AppComponent', () =>
{
let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let str: any;
let something: any;
let storeDis: any;
let rou: any;
beforeEach(async(() =>
{
  TestBed.configureTestingModule({
    declarations: [ AppComponent, NvbarComponent ],
    imports: [ ReactiveFormsModule,
      ImageCropperModule,
      HttpClientModule,
      RouterTestingModule,
      AngularFireStorageModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule // imports firebase/firestore, only needed for database features
    ],
    providers: [
    ]
  })
    .compileComponents();
}));

beforeEach(() => {
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

   it('should create the app', () => {
     expect(component).toBeTruthy();
   });
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
