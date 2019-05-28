import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ShowproductComponent} from './showproduct/showproduct.component';
import { ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgxsModule} from '@ngxs/store';
import {UserState} from '../shared/statemangement/action/user.state';
import {ProductState} from './statemagnement/product.state';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
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
