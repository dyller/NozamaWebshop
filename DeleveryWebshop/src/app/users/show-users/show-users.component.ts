import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../shared/service/user.service';
import {User} from '../../shared/entities/user';
import {Store} from '@ngxs/store';
import {RemoveUser} from '../../shared/statemangement/action/user.actions';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  users: Observable<User[]>;
  constructor(private us: UserService,
              private store: Store) {
  }

  ngOnInit() {
    this.users = this.us.getUsers();
  }

  deleteUser(user: User) {
    this.store.dispatch(new RemoveUser(user));
  }
}
