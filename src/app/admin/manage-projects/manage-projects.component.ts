import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppService } from '../../app.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  projects = [];
  services = [];
  managers = [];
  engineers = [];
  projectsForm: FormGroup;
  update = false;
  spinner = true;

  constructor(
    private fb : FormBuilder,
    private appService : AppService,
    private adminService : AdminService
  ) {
    this.createForms();
  }

  ngOnInit() {
  }

  createForms() {
    this.projectsForm = this.fb.group({
      projectName: '',
      serviceType: '',
      country: '',
      city: '',
      site: '',
      projectManagers: '',
      engineers: '',
      currentPhase: 1,
      message: 'Welcome all and good luck with this project!',
      status: 'Active'
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

  onSetUp() {
    // this.adminService.saveServices(this.servicesForm.value)
    //   .then(d => this.servicesForm.reset());
  }

  onSelect(project) {
    this.projectsForm.patchValue(project);
    this.update = true;
  }

  onUpdate() {
    // TODO: create service to update the company services
    this.projectsForm.reset();
    this.update = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
