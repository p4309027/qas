import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminService {

  constructor( private afs: AngularFirestore ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  saveServices(service) {
    const timestamp = this.timestamp; console.dir(timestamp);
    return this.afs.collection('services').add({
      ...service,
      createdAt: timestamp
    });
  }

}
