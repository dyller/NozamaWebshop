import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userId: String;
  userFormGroup: FormGroup;
  constructor(
    private auth: AngularFireAuth
  ) {

    this.userFormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {
  }

  Login() {
    const userData = this.userFormGroup.value;
    this.auth.auth.signInWithEmailAndPassword(userData.email, userData.password)
        .then((credential) => {
          window.alert('Succes');
        }).catch(error =>
        window.alert('Bad stuff happened: ' + error)
      );
  }
}
