import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {ShowUsersComponent} from './show-users/show-users.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from '@angular/material';
import {AddUserComponent} from './add-user/add-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [ShowUsersComponent, AddUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    ImageCropperModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule  ]
})
export class UsersModule { }
