import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Product} from '../entities/product';
import {CartService} from '../service/cart.service';
@Component({
  selector: 'app-nvbar',
  templateUrl: './nvbar.component.html',
  styleUrls: ['./nvbar.component.css']
})
export class NvbarComponent implements OnInit {
  cartSize: Array<Product> = JSON.parse(localStorage.getItem('cart'));


  constructor(private cart: CartService) {
  }

  ngOnInit() {
    this.cart.watchStorage().subscribe((data: string) => {
      this.cartSize =  JSON.parse(localStorage.getItem('cart'));
// this will call whenever your localStorage data changes
// use localStorage code here and set your data here for ngFor
    });


  }
}
