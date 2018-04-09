import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class ProjectsService {

  constructor(
    private afs: AngularFirestore
  ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getUserProfile(username) {
    return this.afs.collection(
      'users-profile', ref => ref.where('email', '==', username)
    ).snapshotChanges();
  }

  getUserAssignedProjects( roleField, username, uid) {
    if (roleField) {
      return this.afs.collection(
        'projects', ref => ref.where(`${roleField}.${uid}`, '==', username)
      ).snapshotChanges();
    } else {
      return this.afs.collection(
        'projects', ref => ref.orderBy('createdAt', 'asc')
      ).snapshotChanges();
    }
  }

}
