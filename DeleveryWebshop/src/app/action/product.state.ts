import {Product} from '../shared/entities/product';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {User} from '../shared/entities/user';
import {AddUser, RemoveUser} from "./product.actions";
import * as firebase from "firebase";
import {UserService} from "../shared/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
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

    console.log(state.user);
    firebase.auth().createUserWithEmailAndPassword(state.user.email, state.user.password).
    then((credential) => {
      state.user.id = credential.user.uid;
      console.log(state.user.id)
      this.us.addUser(state.user);
      this.router.navigate([''],
        {relativeTo: this.activatedRoute});
    })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(state.user.email);
        console.log(errorCode);
        console.log(errorMessage);
        this.router.navigate([''],
          {relativeTo: this.activatedRoute});
        // ...
      });
  }

  @Action(RemoveUser)
  remove({getState, patchState }: StateContext<UserStateModel>, { payload }: RemoveUser) {
    patchState({
      //user: getState().user.filter(a => a.name !== payload)
    });
  }

}

