import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {

  services = [];
  servicesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private adminService: AdminService
  ) {
    this.createForms();
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
      .subscribe(data => this.services = data);
  }

  onSave() {
    this.adminService.saveServices(this.servicesForm.value)
      .then(d => this.servicesForm.reset());
  }

  ngOnInit() {
    this.getServices();
  }

}
