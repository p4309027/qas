import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.css']
})
export class CompanyServicesComponent implements OnInit {
  step = 0;
  services = [];

  constructor(private appService: AppService) { }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.appService.getCompanyServices()
      .subscribe(data => this.services = data);
  }

}
