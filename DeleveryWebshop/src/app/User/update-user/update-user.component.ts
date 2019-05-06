import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared/service/user.service';
import * as firebase from '../add-user/add-user.component';
import {User} from '../../shared/entities/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userFormGroup: FormGroup;
  id: string;
  
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private uservice: UserService)
  {
    this.userFormGroup = new FormGroup( {
      username: new FormControl('')
    });
  }

  ngOnInit() {
    this.id =  this.actRoute.snapshot.paramMap.get('id');
    this.uservice.getUserById(this.id)
      .subscribe(usr => {
        this.userFormGroup.patchValue({
          username: usr.username
        });
      });
  }

  updateUser() {
    const userData = this.userFormGroup.value;
    userData.id = this.id;
    this.uservice.updateUser(
      userData
    );

    // Ones we are done we want to navigate to this location
    this.router.navigateByUrl('/show-users');
  }
}
