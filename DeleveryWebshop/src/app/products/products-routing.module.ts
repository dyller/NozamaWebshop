import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowproductComponent} from './showproduct/showproduct.component';
import {AddproductComponent} from './addproduct/addproduct.component';
import {UpdateProductsComponent} from './update-products/update-products.component';
import {AuthGuard} from "../shared/core/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ShowproductComponent
  },
  {
    path: 'add-product',
    component: AddproductComponent , canActivate: [AuthGuard]
  },
  {path: 'update-products/:id',
    component: UpdateProductsComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
