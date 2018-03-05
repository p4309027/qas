import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentUserUsername:  BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  shareUserName(email) {
    this.currentUserUsername.next(email);
  }

  loginStatus(status) {
    this.isAuthenticated.next(status);
  }

}
