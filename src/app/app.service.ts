import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AppService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  currentUserUsername:  BehaviorSubject<string> = new BehaviorSubject('');

  constructor( private afs: AngularFirestore ) {}

  shareUserName(email) {
    this.currentUserUsername.next(email);
  }

  loginStatus(status) {
    this.isAuthenticated.next(status);
  }

  getCompanyServices() {
    return this.afs.collection('services').valueChanges();
  }
}
