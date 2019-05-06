import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/service/user.service";
import * as firebase from "firebase";

@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userId: String;
  userFormGroup: FormGroup;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private us: UserService) {

    this.userFormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {
  }

  Login() {
    const userData = this.userFormGroup.value;
   firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .then((credential) => {
          /*  console.log(credential.user.uid);
          this.userId = credential.user.uid;*/
        }).catch(error =>
        window.alert('Bad stuff happened: ' + error)
      );
  }
}
