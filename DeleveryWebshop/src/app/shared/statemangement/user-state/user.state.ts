import { State, Action, StateContext, Selector } from '@ngxs/store';
import {User} from '../../entities/user';
import {AddUser,  RemoveUser} from './user.actions';
import {UserService} from '../../service/user.service';
import {ActivatedRoute, Router} from '@angular/router';

export class UserStateModel {
  user: User;
}

@State<UserStateModel>({
  name: 'guest',
  defaults: {
    user:
    {
      Username: 'guest',
      Email: null,
      id: null,
      Password: null,
      Address: null
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
  static getUsers(state: UserStateModel) {
    return state.user;
  }

  // Section 5
  @Action(AddUser)
  add({getState}: StateContext<UserStateModel>, { payload, payload2 }: AddUser) {
    const state = getState();
    getState().user = payload;
    this.us.addUser(state.user, payload2)
      .subscribe(() => {
      });
  }

  @Action(RemoveUser)
  remove({getState }: StateContext<UserStateModel>, { payload }: RemoveUser) {
    const state = getState();
    this.us.removeUser(payload.id);
  }

}

