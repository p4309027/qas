import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { LoginService } from '../../login/login.service';


@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  services = [];
  servicesForm: FormGroup;
  update = false;
  spinner = true;
  spinnerAdmin = false;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private adminService: AdminService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.createForms();
  }


  ngOnInit() {
    // router guard alternative
    // this.loginService.shareUserName
    //   .takeUntil(this.ngUnsubscribe)
    //   .subscribe(username => {
    //     if (username) {
    //       this.adminService.getUserProfile(username)
    //         .takeUntil(this.ngUnsubscribe)
    //         .subscribe( user => {
    //           const role = user[0].payload.doc.data().role;
    //           if (role !== 'admin') {
    //             this.router.navigate(['**']);
    //           } else {
    //             this.spinnerAdmin = true;
    //           }
    //         });
    //     }
    //   });
    // end alternative
    this.getServices();
  }

  createForms() {
    this.servicesForm = this.fb.group({
      name: '',
      description: '',
      img: '',
      info: '',
      moreInfo: ''
    });
  }

  getServices() {
    this.appService.getCompanyServices()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.services = data;
        this.spinner = false;
        this.spinnerAdmin = true;
      });
  }

  onSave() {
    this.adminService.saveServices(this.servicesForm.value)
      .then(d => this.servicesForm.reset());
  }

  onSelect(service) {
    this.servicesForm.patchValue(service);
    this.update = true;
  }

  onUpdate() {
    // TODO: create service to update the company services
    this.servicesForm.reset();
    this.update = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
