import {Product} from '../../entities/product';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {User} from '../../entities/user';
import {AddUser, ReadAllUser, RemoveUser, UpdateUser} from './user.actions';
import * as firebase from 'firebase';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../../core/auth.service";
export class UserStateModel {
  user: User;

}
@State<UserStateModel>({
  name: 'guest',
  defaults: {
    user: {
      username: 'guest',
      email: null,
      id: null,
      password: null,
      address: null
    }
  }
})
export class UserState {
  constructor(private us: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {}
  // Section 4
  @Selector()
  static getTutorials(state: UserStateModel) {
    return state.user;
  }

  // Section 5
  @Action(AddUser)
  add({getState }: StateContext<UserStateModel>, { payload }: AddUser) {
    const state = getState();
    getState().user = payload;
    this.us.addUser(state.user);
    this.router.navigate([''],
      {relativeTo: this.activatedRoute});

  }

  @Action(RemoveUser)
  remove({getState }: StateContext<UserStateModel>, { payload }: RemoveUser) {
    const state = getState();
    this.us.removeUser(payload);
  }

}

