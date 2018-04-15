import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminService {

  constructor( private afs: AngularFirestore ) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getAdmin(username) {
    return this.afs.collection('users-profile', ref => ref.where('email', '==', username))
            .valueChanges();
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
    ).snapshotChanges();
  }

  getEngineers() {
    return this.afs.collection(
      'users-profile', ref => ref.where('role', '==', 'engineer')
    ).snapshotChanges();
  }

  getProjects() {
    return this.afs.collection(
      'projects', ref => ref.orderBy('createdAt', 'asc')
    ).valueChanges();
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

  getAllUsers() {
    return this.afs.collection('users-profile').snapshotChanges();
  }

}
