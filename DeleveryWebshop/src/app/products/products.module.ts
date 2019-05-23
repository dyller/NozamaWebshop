import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ShowproductComponent} from './showproduct/showproduct.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MomentModule} from 'angular2-moment';
import {AppRoutingModule} from '../app-routing.module';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NgxsModule} from '@ngxs/store';
import {UserState} from '../shared/statemangement/action/user.state';
import {ProductState} from './statemagnement/product.state';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AddproductComponent} from './addproduct/addproduct.component';
import {UpdateProductsComponent} from './update-products/update-products.component';

@NgModule({
  declarations: [ ShowproductComponent, AddproductComponent, UpdateProductsComponent ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgxsModule.forRoot(
      [UserState, ProductState]
    ),
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class ProductsModule { }
