import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from './order/order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {MomentModule} from "angular2-moment";
import {AppRoutingModule} from "../app-routing.module";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {ImageCropperModule} from "ngx-image-cropper";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {NgxsModule} from "@ngxs/store";
import {UserState} from "../shared/statemangement/action/user.state";
import {ProductState} from "../products/statemagnement/product.state";
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class OrderModule { }
