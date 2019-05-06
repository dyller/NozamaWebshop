import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowproductComponent} from './products/showproduct/showproduct.component';

import {AddproductComponent} from './products/addproduct/addproduct.component';
import {ShowUsersComponent} from './User/show-users/show-users.component';
import {AddUserComponent} from './User/add-user/add-user.component';
import {LoginComponent} from './User/login/login.component';
import {UpdateUserComponent} from './User/update-user/update-user.component';
import {UpdateProductsComponent} from "./products/update-products/update-products.component";
import {OrderComponent} from "./order/order/order.component";

const routes: Routes = [
  {path: '', component: ShowproductComponent},
  {path: 'add-product', component: AddproductComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'show-users/update-user/:id', component: UpdateUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'update-products/:id', component: UpdateProductsComponent},
  {path: 'show-users', component: ShowUsersComponent},
  {path: 'order', component: OrderComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
