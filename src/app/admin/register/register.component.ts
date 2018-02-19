import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roles = [ 'admin', 'project manager', 'engineer' ];

  constructor( private fb: FormBuilder, private adminService: AdminService) {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.email ]],
      userRole: ['', Validators.required ]
    });
  }

  onRegister() {
    this.adminService.register(this.registerForm.value);
  }

  ngOnInit() {
  }

}
