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

  currentUserEmail: string;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private appService: AppService,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
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
