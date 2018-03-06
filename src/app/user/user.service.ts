import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  currentUser:  Subject<any> = new Subject();

  constructor( private afs: AngularFirestore ) { }

  getUserProfile(username) {
    if (username) {
      this.afs.collection('users-profile', ref => ref.where('email', '==', username))
        .snapshotChanges()
        .subscribe( data => this.currentUser.next(data[0].payload.doc));
    }
  }

  updateUserProfile(uid: string, newDetails: any) {
    return this.afs.doc('users-profile/' + uid).update(newDetails);
  }

  updateUserContact(uid: string, newDetails: any) {
    return this.afs.doc('users-profile/' + uid).update({contact: newDetails});
  }

}
