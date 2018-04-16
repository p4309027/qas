import { UserAuthData } from './../helper/models/user.model';
import { LoginService } from './login.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flyInOut', [
      // view mode
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      // 'in' mode
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)'}),
        animate('.3s 1s ease-out')
      ]),
      // 'out' mode
      transition('* => void', [
        animate('.3s ease-in', style({opacity: 0, transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  usernameCheckForm: FormGroup;
  loginForm: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject();
  userAuthData: UserAuthData;
  next = true;
  userExists = true;
  spinner = false;
  spinnerDiameter = (window.innerWidth > 599) ? '59' : '36';
  hide = true;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
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
    this.spinner = true;
    this.loginService.checkUsername(username)
      .takeUntil(this.ngUnsubscribe)
      .subscribe((result: Array<any>) => {
        if (result.length === 0) {
          this.userExists = false;
        }
        this.next = false;
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
