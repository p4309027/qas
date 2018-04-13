import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppService } from '../../app.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { LoginService } from '../../login/login.service';
import { UserProfile } from '../../helper/models/user.model';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ServerResponseDialogComponent } from '../../helper/dialogs/server-response-dialog/server-response-dialog.component';


@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.css']
})
export class ManageProjectsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  projects = [];
  services = [];
  projectManagers = [];
  engineers = [];
  projectForm: FormGroup;
  update = false;
  spinnerForm = true;
  spinnerList = true;
  spinnerSetUp = false;
  admin: UserProfile;
  spinnerAdmin = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private appService: AppService,
    private adminService: AdminService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.setUpData();
  }

  createForms() {
    this.projectForm = this.fb.group({
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

  arrayToCustomObject(array: any) {
    const obj = {};
    array.forEach(element => {
      obj[element.uid] = element.email;
    });
    return obj;
  }

  setUpData() {
    this.appService.getCompanyServices()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.services = data;
      });

    this.adminService.getEngineers()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: any) => {
        data.map(d => {
          const engineer = d.payload.doc.data();
          engineer.uid = d.payload.doc.id;
          this.engineers.push(engineer);
        });
      });

    this.adminService.getProjectManagers()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: any) => {
        data.map(d => {
          const pm = d.payload.doc.data();
          pm.uid = d.payload.doc.id;
          this.projectManagers.push(pm);
        });
        this.spinnerForm = false;
      });

    this.adminService.getProjects()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.projects = data;
        this.spinnerList = false;
    });

    this.loginService.shareUserName
      .takeUntil(this.ngUnsubscribe)
      .subscribe(username => {
        if (username) {
          this.adminService.getAdmin(username)
            .takeUntil(this.ngUnsubscribe)
            .subscribe( (user: any) => {
                this.admin = {
                  email: user[0].email,
                  firstName: user[0].firstName,
                  lastName: user[0].lastName,
                  role: user[0].role
                };
                this.spinnerAdmin = true;
            });
        }
      });
  }

  onSetUpProject() {
    this.spinnerSetUp = true;
    const newProject = {
      projectName: this.projectForm.value.projectName,
      serviceType:  this.projectForm.value.serviceType,
      projectManagers: this.arrayToCustomObject(this.projectForm.value.projectManagers),
      engineers: this.arrayToCustomObject(this.projectForm.value.engineers),
      site: this.projectForm.value.site,
      city: this.projectForm.value.city,
      country: this.projectForm.value.country,
      currentPhase: 1,
      status: 'Active',
      activePhase: 'phase1',
      phases: {
        phase1: 'phase1'
      },
      completedPhases: []
    };

    const phaseObj = {
      username: this.admin.email,
      fullName: this.admin.firstName + ' ' + this.admin.lastName,
      message: 'Welcome all and good luck with this project!',
      role: this.admin.role
    };

    const initPhaseNumber = 'phase1';

    this.adminService.saveProjects(newProject, phaseObj, initPhaseNumber)
      .then( data => {
        if (data.id) {
          this.spinnerSetUp = false;
          this.dialog.open( ServerResponseDialogComponent, {
            height: '180px',
            data: { messageForDialog: 'New Project has been successfully set up'}
          });
          this.projectForm.reset({
            projectName: '',
            serviceType:  '',
            projectManagers: '',
            engineers: '',
            site: '',
            city: '',
            country: '',
            message: 'Welcome all and good luck with this project!'
          });
        }
      });
  }

  // update project
  onSelect(project) {
    // this.projectForm.patchValue(project);
    // this.update = true;
  }

  // update project
  onUpdate() {
    // TODO: create service to update the project
    this.projectForm.reset();
    this.update = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
