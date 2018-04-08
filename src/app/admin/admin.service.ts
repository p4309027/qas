import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminService {

  constructor( private afs: AngularFirestore ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getUserProfile(username) {
    return this.afs.collection('users-profile', ref => ref.where('email', '==', username))
            .snapshotChanges();
  }

  saveServices(service) {
    const timestamp = this.timestamp;
    return this.afs.collection('services').add({
      ...service,
      createdAt: timestamp
    });
  }

  getProjectManagers() {
    return this.afs.collection(
      'users-profile', ref => ref.where('role', '==', 'project manager')
    ).valueChanges();
  }

  getEngineers() {
    return this.afs.collection(
      'users-profile', ref => ref.where('role', '==', 'engineer')
    ).valueChanges();
  }

  getProjects() {
    return this.afs.collection('projects').valueChanges();
  }

  saveProjects(project, phaseObj, phase) {
    const timestamp = this.timestamp;
    return this.afs.collection('projects').add({
      ...project,
      createdAt: timestamp
    }).then( res => {
      return this.afs.collection('projects').doc(res.id).collection(phase).add({
        ...phaseObj,
        createdAt: timestamp
      });
    });
  }

}
