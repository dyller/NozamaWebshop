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
import {AngularFireAuthModule} from "@angular/fire/auth";

@NgModule({
  declarations: [
    AppComponent,
    ShowproductComponent,
    AddproductComponent,
    NvbarComponent,
    ShowUsersComponent,
    AddUserComponent
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
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
