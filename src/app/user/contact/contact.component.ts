import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  isDisabled = true;
  private ngUnsubscribe: Subject<any> = new Subject();
  currentUserContact = {};
  userDbId: string;
  spinner = true;  
  showReminder = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.createContactForm();
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      email: [{value: '', disabled: true}],
      address: [{value: '', disabled: true}],
      city: [{value: '', disabled: true}],
      country: [{value: '', disabled: true}],
      phone: [{value: '', disabled: true}]
    });
  }
  
  enable() {
    this.isDisabled = false;
    this.contactForm.get('address').enable();
    this.contactForm.get('city').enable();
    this.contactForm.get('country').enable();
    this.contactForm.get('phone').enable();
  }

  disable() {
    this.isDisabled = true;
    this.contactForm.get('address').disable();
    this.contactForm.get('city').disable();
    this.contactForm.get('country').disable();
    this.contactForm.get('phone').disable();
  }
  
  onSave() {
    this.userService.updateUserContact(this.userDbId, this.contactForm.value)
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
    let address = this.contactForm.value.address;
    let city =this.contactForm.value.city;
    let country = this.contactForm.value.country;
    let phone =this.contactForm.value.phone;
    if (!address || !city || !country || !phone) {
      this.showReminder = true;
      this.enable();
    } else {
      this.showReminder = false;
      this.disable();
    }
  }

  ngOnInit() {
    this.userService.currentUser
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.userDbId = data.id;
        this.currentUserContact = {
          email: data.data().email,
          address: data.data().contact.address,
          city: data.data().contact.city,
          country: data.data().contact.country,
          phone: data.data().contact.phone
        };
        this.contactForm.patchValue(this.currentUserContact);
        this.spinner = false;
        this.checkValidity();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
