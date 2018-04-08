import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../helper/models/user.model';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  spinner = true;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private adminService: AdminService,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    // router guard alternative
    this.loginService.shareUserName
      .takeUntil(this.ngUnsubscribe)
      .subscribe(username => {
        if (username) {
          this.adminService.getAdmin(username)
            .takeUntil(this.ngUnsubscribe)
            .subscribe( (user: any) => {
              const role = user[0].role;
              if (role !== 'admin') {
                this.router.navigate(['**']);
              } else {
                this.spinner = false;
              }
            });
        }
      });
      // end alternative
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
