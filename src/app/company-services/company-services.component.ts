import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { AppService } from '../app.service';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.css']
})
export class CompanyServicesComponent implements OnInit, OnDestroy {
  step = 0;
  services = [];
  private ngUnsubscribe: Subject<any> = new Subject();
  spinner = true;

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.appService.getCompanyServices()
      .subscribe(data => {
        this.services = data;
        this.spinner = false;
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
