import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageMetadata} from '../../shared/entities/image-metadata';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {UserService} from '../../shared/service/user.service';
import * as firebase from 'firebase';
import {Store} from "@ngxs/store";
import {AddUser} from "../../shared/statemangement/action/user.actions";
import {AuthService} from "../../shared/core/auth.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userFormGroup: FormGroup;
  constructor (private router: Router,
               private activatedRoute: ActivatedRoute,
               private us: UserService,
               private authServer: AuthService) {

    this.userFormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      phonenumber: new FormControl('')
    });
  }


  ngOnInit() {
  }
  googleLogin() {

  }
  addUser() {
    const userData = this.userFormGroup.value;
    this.authServer.createUser(userData);
   /* firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).
    then((credential) => {
        userData.id = credential.user.uid;
      console.log(userData.id)
      this.us.addUser(userData);
      //this.router.navigate(['../'],
       // {relativeTo: this.activatedRoute});
      })
      .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(userData.email);
      console.log(errorCode);
      console.log(errorMessage);
      //this.router.navigate(['../'],
        //{relativeTo: this.activatedRoute});
      // ...
    });*/
  }
}
