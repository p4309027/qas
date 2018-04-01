import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AdminService {

  constructor( private afs: AngularFirestore ) { }

  saveServices(service) {
    return this.afs.collection('services').add({...service});
  }

}
