import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './../../login/login.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  authStatus = false;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor( private loginService: LoginService) {}

  onLogout() {
    this.loginService.logout();
  }

  ngOnInit() {
    this.loginService.authStateChange
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        authStatus => this.authStatus = authStatus
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
