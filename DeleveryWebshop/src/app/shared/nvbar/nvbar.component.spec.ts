import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvbarComponent } from './nvbar.component';
import {AddproductComponent} from '../../products/addproduct/addproduct.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {Store} from '@ngxs/store';

describe('NvbarComponent', () => {

  let component: NvbarComponent;
  let fixture: ComponentFixture<NvbarComponent>;
  let str: any;
  let something: any;

  beforeEach(async(() =>
  {
    str = jasmine.createSpyObj('Store', ['dispatch']);
    something = jasmine.createSpyObj('addProduct', ['store']);
    str.dispatch.and.callThrough(something);

    TestBed.configureTestingModule({
      declarations: [ NvbarComponent ],
      imports: [ ReactiveFormsModule,
        ImageCropperModule,
        HttpClientModule,
        RouterTestingModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule // imports firebase/firestore, only needed for database features
      ],
      providers: [
        {provide: Store, useValue: str}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(NvbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

});
