import { UserAuthData } from './../helper/models/user-auth-data.model';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameCheckForm: FormGroup;
  loginForm: FormGroup;
  userAuthData: UserAuthData;
  next = true;
  userExists = true;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.createForms();
  }

  createForms() {
    this.usernameCheckForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]]
    });
    this.loginForm = this.fb.group({
      password: ['', [ Validators.required, Validators.minLength(6) ]]
    });
  }

  onNext(username) {
    this.loginService.checkUsername(username).subscribe((result: Array<any>) => {
      if (result[0] === undefined) {
        this.userExists = false;
        this.loginService.createNewUser(username)
          .then(() => {
            this.next = false;
          });
      } else if (result[0].email === username) {
        this.next = false;
      } else {
        console.log(result);
      }
    });
  }

  onLogin(password) {
    this.userAuthData = {
      email: this.usernameCheckForm.value.email,
      password: password
    };
    if (!this.userExists) {
      this.loginService.registerUser(this.userAuthData);
    } else {
      this.loginService.loginUser(this.userAuthData);
    }
  }

  ngOnInit() {
  }

}
