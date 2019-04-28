import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../shared/service/product.service";
import {ImageMetadata} from "../../shared/entities/image-metadata";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {UserService} from "../../shared/service/user.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userFormGroup: FormGroup;
  constructor (private router: Router,
               private activatedRoute: ActivatedRoute,
               private us: UserService) {

    this.userFormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      address: new FormControl('')
    });
  }

  ngOnInit() {
  }
  addUser() {
    const userData = this.userFormGroup.value;
    this.us.addUser(
      userData
    ).subscribe(product => {
        this.router.navigate(['../'],
          {relativeTo: this.activatedRoute});
      },
      error1 => {
        window.alert('Bad stuff happened: was not able to add user ' + error1);
      });
  }


}
