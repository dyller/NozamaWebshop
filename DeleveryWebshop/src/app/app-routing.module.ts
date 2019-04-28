import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowproductComponent} from './products/showproduct/showproduct.component';

import {AddproductComponent} from './products/addproduct/addproduct.component';
import {ShowUsersComponent} from './User/show-users/show-users.component';
import {AddUserComponent} from './User/add-user/add-user.component';

const routes: Routes = [
  {path: '', component: ShowproductComponent},
  {path: 'add-product', component: AddproductComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'show-users', component: ShowUsersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
