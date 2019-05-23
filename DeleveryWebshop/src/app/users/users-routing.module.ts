import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowUsersComponent} from "./show-users/show-users.component";
import {AddUserComponent} from "./add-user/add-user.component";

const routes: Routes = [
  {
    path: '',
    component: ShowUsersComponent
  },
  {path: 'add-user', component: AddUserComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
