import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserAuthData } from './../helper/models/user-auth-data.model';

@Injectable()
export class LoginService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afa: AngularFireAuth
  ) { }

  checkUsername(username) {
    return this.afs.collection('users-profile', ref => ref.where('email', '==', username)).valueChanges();
 }

 createNewUser(username) {
   return this.afs.collection('users-profile').add({email: username, role: 'new starter'});
 }

 registerUser(userAuthData: UserAuthData) {
   this.afa.auth
     .createUserWithEmailAndPassword(userAuthData.email, userAuthData.password)
     .then(result => {
       this.loginUser(userAuthData);
     })
     .catch(err => {
       console.log(err);
     });
 }

 loginUser(userAuthData: UserAuthData) {
   this.afa.auth
     .signInWithEmailAndPassword(userAuthData.email, userAuthData.password)
     .then(result => {
       this.isAuthenticated.next(true);
       this.router.navigate(['/user']);
     })
     .catch(err => {
       console.log(err);
     });
 }

 logout() {
  this.isAuthenticated.next(false);
   this.afa.auth.signOut();
   this.router.navigate(['/login']);
 }

}
