import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  isDisabled = true;
  private ngUnsubscribe: Subject<any> = new Subject();
  currentUser = {};
  userDbId: string;
  spinner = true;
  showReminder = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createProfileForm();
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      firstName: [{value: '', disabled: true}],
      lastName: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      role: [{value: '', disabled: true}],
      projects: [{value: '', disabled: true}]
    });
  }
  
  enable() {
    this.isDisabled = false;
    this.profileForm.get('firstName').enable();
    this.profileForm.get('lastName').enable();
  }

  disable() {
    this.isDisabled = true;
    this.profileForm.get('firstName').disable();
    this.profileForm.get('lastName').disable();
  }

  onSave() {
    this.userService.updateUserProfile(this.userDbId, this.profileForm.value)
      .then(result => {})
      .catch(error => {
        console.log(error);
      });
    this.checkValidity();
  }

  onUpdate() {
    this.isDisabled = false;
    this.enable();
  }

  checkValidity() {
    let fName = this.profileForm.value.firstName;
    let lName =this.profileForm.value.lastName;
    if (!fName || !lName) {
      this.showReminder = true;
      this.enable();
    } else {
      this.showReminder = false;
      this.disable();
    }
  }

  ngOnInit() {
    // 'user component' will request user profile object via 'user service'
    // then 'user service' will get the data and triggers 'currentUser' Subject
    // the 'profile component' will listen to 'currentUser' Subject
    // and update user's profile form in the view
    this.userService.currentUser
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.userDbId = data.id;
        var projects = data.data().projects;
        if (Object.keys(projects).length === 0) {
          projects = 'to be confirmed';
        }
        this.currentUser = {
          firstName: data.data().firstName,
          lastName: data.data().lastName,
          email: data.data().email,
          role: data.data().role,
          projects: projects
        };
        this.profileForm.patchValue(this.currentUser);
        this.spinner = false;
        this.checkValidity();
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
