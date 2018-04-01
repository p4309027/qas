import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit {

  servicesForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForms();
  }

  createForms() {
    this.servicesForm = this.fb.group({
      name: '',
      img: '',
      info: ''
    });
  }

  onSave() {
    console.log(this.servicesForm.value);
  }

  ngOnInit() {
  }

}
