import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AppService {
  constructor( private afs: AngularFirestore ) {}

  getCompanyServices() {
    return this.afs.collection(
        'services', ref => ref.orderBy('createdAt', 'asc')
      ).valueChanges();
  }

}
