
import {User} from '../../entities/user';
import * as firebase from 'firebase';
import {ImageMetadata} from '../../entities/image-metadata';

export class AddUser {
  static readonly type = '[users] Add';

  constructor(public payload: User, public payload2: ImageMetadata) {}
}

export class RemoveUser {
  static readonly type = '[users] Remove';

  constructor(public payload: User) {}
}

