import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private fb: FormBuilder,
    private appService: AppService,
    private adminService: AdminService
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.setUpData();
  }

  createForms() {
    this.projectsForm = this.fb.group({
      projectName: ['', Validators.required],
      serviceType:  [[''], Validators.required],
      projectManagers: [[''], Validators.required],
      engineers: [[''], Validators.required],
      site: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      message: 'Welcome all and good luck with this project!'
    });
  }

  setUpData() {
    this.appService.getCompanyServices()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.services = data;
        this.spinner = false;
      });
  }

  onSetUpProject() {
    const newProject = {
      projectName: this.projectsForm.value.projectName,
      serviceType:  Object.assign({}, this.projectsForm.value.serviceType),
      projectManagers: Object.assign({}, this.projectsForm.value.projectManagers),
      engineers: Object.assign({}, this.projectsForm.value.engineers),
      site: this.projectsForm.value.site,
      city: this.projectsForm.value.city,
      country: this.projectsForm.value.country,
      currentPhase: 1,
      message: 'Welcome all and good luck with this project!',
      status: 'Active',
      phases: {
        1: {
          name: 'phase1',
          status: 'active'
        }
      }
    };
    console.log(newProject);
  }

  onSelect(project) {
    this.projectsForm.patchValue(project);
    this.update = true;
  }

  onUpdate() {
    // TODO: create service to update the project
    this.projectsForm.reset();
    this.update = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
