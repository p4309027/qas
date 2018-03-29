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
  isLoggedIn = false;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor( private appService: AppService, private loginService: LoginService) {}

  onLogout() {
    this.loginService.logout();
  }

  ngOnInit() {
    this.appService.isAuthenticated
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => this.isLoggedIn = data
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
