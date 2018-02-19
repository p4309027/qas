import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AdminService {

  constructor( private afs: AngularFirestore) { }

  register(newUser) {
    this.afs.collection('users').add(newUser);
  }

}
