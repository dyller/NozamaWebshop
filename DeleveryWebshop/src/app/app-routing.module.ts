import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowproductComponent} from './products/showproduct/showproduct.component';

import {AddproductComponent} from './products/addproduct/addproduct.component';

const routes: Routes = [
  {path: '', component: ShowproductComponent},
  {path: 'add-product', component: AddproductComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
