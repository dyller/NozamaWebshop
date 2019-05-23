import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowproductComponent} from './products/showproduct/showproduct.component';

import {AddproductComponent} from './products/addproduct/addproduct.component';
import {ShowUsersComponent} from './users/show-users/show-users.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {LoginComponent} from './users/login/login.component';
import {UpdateProductsComponent} from './products/update-products/update-products.component';
import {OrderComponent} from './order/order/order.component';
import {AuthGuard} from './shared/core/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'orders',
    loadChildren: './order/order.module#OrderModule'
  },

  {
    path: '',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
