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
  isAdmin = false;

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

    // check user role
    this.loginService.shareUserName
      .takeUntil(this.ngUnsubscribe)
      .subscribe(username => {
        if (username) {
          this.loginService.checkUsername(username)
            .takeUntil(this.ngUnsubscribe)
            .subscribe( (user: any) => {
              const role = user[0].role;
              if (role === 'admin') {
                this.isAdmin = true;
              } else {
                this.isAdmin = false;
              }
            });
        }
      });
      // END check user role
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
