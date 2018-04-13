import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css']
})
export class PhasesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  id: string;
  phases: any;
  project: any;
  spinner = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe( params => {
        this.id = params['id'];
        if (this.id) {
          this.projectsService.getProject(this.id)
          .takeUntil(this.ngUnsubscribe)
          .subscribe((project: any) => {
            this.project = project;
            this.project.id = this.id;
            this.phases = Object.values(project.phases);
            this.spinner = false;
          });
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
