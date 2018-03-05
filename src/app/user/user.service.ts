import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UserService {

  constructor( private afs: AngularFirestore ) { }

  getUserProfile(username) {
    return this.afs.collection('users-profile', ref => ref.where('email', '==', username)).snapshotChanges();
  }

  updateUserProfile(username, user) {
    return this.afs.doc('users-profile/' + username).update(user);
  }

}
