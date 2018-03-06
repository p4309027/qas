import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserAuthData } from './../helper/models/user.model';
import { AppService } from '../app.service';

@Injectable()
export class LoginService {

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private appService: AppService
  ) { }

  checkUsername(username) {
    return this.afs.collection('users-profile', ref => ref.where('email', '==', username)).valueChanges();
 }

  createNewUser(username) {
    return this.afs.collection('users-profile').add({
      firstName: '',
      lastName: '',
      email: username,
      role: 'new starter',
      projects: 'to be confirmed'
    });
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
      this.appService.loginStatus(true);
       this.appService.shareUserName(result.email);
       this.router.navigate(['/user']);
     })
     .catch(err => {
       console.log(err);
     });
 }

 logout() {
   this.appService.loginStatus(false);
   this.afa.auth.signOut();
   this.router.navigate(['/login']);
 }

}
