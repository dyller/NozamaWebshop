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
import { ShowUsersComponent } from './User/show-users/show-users.component';
import { AddUserComponent } from './User/add-user/add-user.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { LoginComponent } from './User/login/login.component';

import { OrderComponent } from './order/order/order.component';
import { NgxsModule } from '@ngxs/store';
import { UpdateUserComponent } from './User/update-user/update-user.component';
import {UpdateProductsComponent} from "./products/update-products/update-products.component";
import {AuthService} from "./shared/core/auth.service";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {UserState} from "./action/product.state";


@NgModule({
  declarations: [
    AppComponent,
    ShowproductComponent,
    AddproductComponent,
    NvbarComponent,
    ShowUsersComponent,
    AddUserComponent,
    LoginComponent,
    OrderComponent,
    UpdateUserComponent,
    UpdateProductsComponent
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
      [UserState]
    ),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
