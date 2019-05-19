import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../shared/entities/product";
import {ProductService} from "../../shared/service/product.service";
import {FileService} from "../../shared/service/file.service";
import {tap} from "rxjs/operators";
import {UserService} from "../../shared/service/user.service";
import {User} from "../../shared/entities/user";
import * as firebase from "firebase";

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  users: Observable<User[]>;
  constructor(private us: UserService) {
  }

  ngOnInit() {
    this.users = this.us.getUsers();
  }

  deleteProduct(user: User) {
    const obs = this.us.deleteUser(user.id);
    obs.subscribe(productFromFirebase => {
      window.alert('user with id: ' + productFromFirebase.id + ' is Deleted');
    }, error1 => {
      window.alert('user not found id: ' + user.id);
    });
  }
}
