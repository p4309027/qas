import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppService } from '../../app.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


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

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private adminService: AdminService
  ) {
    this.createForms();
  }


  ngOnInit() {
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
