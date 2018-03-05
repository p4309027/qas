import { UserService } from './../user.service';
import { AppService } from './../../app.service';
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
  currentUserEmail: string;
  userDbId: string;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
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

  toggle() {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      this.profileForm.get('firstName').disable();
      this.profileForm.get('lastName').disable();
    } else {
      this.profileForm.get('firstName').enable();
      this.profileForm.get('lastName').enable();
    }
  }

  onSave() {
    this.userService.updateUserProfile(this.userDbId, this.profileForm.value)
      .then(result => {})
      .catch(error => {
        console.log(error);
      });
    this.toggle();
  }

  onUpdate() {
    this.toggle();
  }

  ngOnInit() {
    // get the user's email address
    this.appService.currentUserUsername
      .takeUntil(this.ngUnsubscribe)
      .subscribe(email => this.currentUserEmail = email);

    // get user's profile details using the user's email address
    // then update user's profile form in the view
    this.userService.getUserProfile(this.currentUserEmail)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          this.userDbId = data[0].payload.doc.id;
          this.profileForm.patchValue({
            firstName: data[0].payload.doc.data().firstName,
            lastName: data[0].payload.doc.data().lastName,
            email: data[0].payload.doc.data().email,
            role: data[0].payload.doc.data().role,
            projects: data[0].payload.doc.data().projects
          });
        },
        err => console.log(err)
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
