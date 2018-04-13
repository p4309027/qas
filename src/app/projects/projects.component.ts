import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { LoginService } from '../login/login.service';
import { ProjectsService } from './projects.service';
import { UserProfile } from '../helper/models/user.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  currentUser: UserProfile;
  projects = [];
  step = 0;
  spinner = true;
  notAssigned = false;

  constructor(
    private loginService: LoginService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.loginService.shareUserName
      .takeUntil(this.ngUnsubscribe)
      .subscribe(username => {
        if (username) {
          this.projectsService.getUserProfile(username)
            .takeUntil(this.ngUnsubscribe)
            .subscribe((user: any) => {
              this.currentUser = user[0].payload.doc.data();
              this.currentUser.uid = user[0].payload.doc.id;
              let roleField;
              if (this.currentUser.role === 'engineer') {
                roleField = 'engineers';
              } else if (this.currentUser.role === 'project manager') {
                roleField = 'projectManagers';
              } else if (this.currentUser.role === 'admin') {
                roleField = 'admin';
              } else {
                roleField = null;
              }
              this.projectsService.getUserAssignedProjects(
                roleField, this.currentUser.email, this.currentUser.uid)
                .subscribe( (projects: any) => {
                  if (projects.length > 0) {
                    // for each project within 'projects':
                    // access to document's payload.doc.data()
                    // store it in a new field, called 'modified'
                    // store document id in the 'midified' field too
                    projects.map( (p: any) => {
                      p.modified = {...p.payload.doc.data(), id: p.payload.doc.id};
                    });
                    // to simplify the data:
                    // create new arrray from 'projects's 'modified' field
                    const projectsModified = Array.from(
                      projects, (p: any) => p = p.modified
                    );
                    // sort projects by 'createdAt' time in ascending order
                    projectsModified.sort( (a: any, b: any) => {
                      return a.createdAt.getTime() - b.createdAt.getTime();
                    });
                    // followings are simplified for view (html) only
                    // turn array of list of services into one string
                    // turn 'engineers' & 'pms' objects into array, then
                    // transform them into one string
                    projectsModified.map( (p: any) => {
                      p.serviceTypeModified = p.serviceType.join(', ');
                      p.projectManagersModified = Object.values(p.projectManagers).join(', ');
                      p.engineersModified = Object.values(p.engineers).join(', ');
                    });
                    this.projects = projectsModified;
                  } else {
                    this.notAssigned = true;
                  }
                  this.spinner = false;
                });
            });
        }
      });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
