import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public formLogin: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+')]),
      password: new FormControl('', Validators.required)
    });
  }

}
