import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { UserService } from './user.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginService.shareUserName
    .takeUntil(this.ngUnsubscribe)
    .subscribe(email => {
     this.userService.getUserProfile(email);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
