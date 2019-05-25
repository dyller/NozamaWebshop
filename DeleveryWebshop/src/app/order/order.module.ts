import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from './order/order.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatTooltipModule} from "@angular/material";
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
