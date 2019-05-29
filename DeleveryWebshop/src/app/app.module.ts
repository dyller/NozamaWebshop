import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowproductComponent } from './products/showproduct/showproduct.component';
import { AddproductComponent } from './products/addproduct/addproduct.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MomentModule} from 'angular2-moment';
import { NvbarComponent } from './shared/nvbar/nvbar.component';
import { ShowUsersComponent } from './users/show-users/show-users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { LoginComponent } from './users/login/login.component';
import {UserState} from './shared/statemangement/user-state/user.state';
import {OrderComponent} from './order/order/order.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UpdateProductsComponent} from './products/update-products/update-products.component';
import {AuthService} from './shared/core/auth.service';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {NgxsModule} from '@ngxs/store';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ProductState} from './shared/statemangement/product-state/product.state';
import {CartState} from "./shared/statemangement/cart-state/cart.state";

@NgModule({
  declarations: [
    AppComponent,
    NvbarComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    MomentModule,
    AppRoutingModule,
    AngularFireStorageModule,
    ImageCropperModule,
    AngularFireAuthModule,
    NgxsModule.forRoot(
      [UserState, ProductState,
        CartState]
    ),
    MatTooltipModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
