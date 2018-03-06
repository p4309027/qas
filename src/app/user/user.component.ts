// import { AppService } from './../app.service';
// import { Router } from '@angular/router';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/takeUntil';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit, OnDestroy {
//   isLoggedIn: Boolean = false;
//   private ngUnsubscribe: Subject<any> = new Subject();

//   constructor( private appService: AppService, private router: Router) {}

//   ngOnInit() {
//     this.appService.isAuthenticated
//       .takeUntil(this.ngUnsubscribe)
//       .subscribe(
//         data => this.isLoggedIn = data
//       );
//     if (!this.isLoggedIn) {
//       this.router.navigate(['/login']);
//     }
//   }

//   ngOnDestroy() {
//     this.ngUnsubscribe.next();
//     this.ngUnsubscribe.complete();
//   }

// }
import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  isLoggedIn: Boolean = false;
  currentUserEmail: string;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private appService: AppService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.appService.isAuthenticated
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => this.isLoggedIn = data
      );
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.appService.currentUserUsername
    .takeUntil(this.ngUnsubscribe)
    .subscribe(email => this.currentUserEmail = email);

    this.userService.getUserProfile(this.currentUserEmail);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
