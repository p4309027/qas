import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AppService {
  currentUserUsername:  BehaviorSubject<string> = new BehaviorSubject('');

  constructor( private afs: AngularFirestore ) {}

  shareUserName(email) {
    this.currentUserUsername.next(email);
  }

  getCompanyServices() {
    return this.afs.collection(
        'services', ref => ref.orderBy('createdAt', 'asc')
      ).valueChanges();
  }
}
