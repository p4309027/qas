import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserAuthData } from './../helper/models/user.model';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../helper/dialog/dialog.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {
  authStateChange = new Subject<boolean>();
  shareUserName = new BehaviorSubject<string>('');
  // TODO: check this if the rooter guard needs this
  private isAuthenticated = false;
  userName: string;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) { }

  openDialog(err) {
    this.dialog.open( DialogComponent, {
      height: '180px',
      data: { messageForDialog: err.message}
    });
  }

  initAuthStatus() {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.authStateChange.next(true);
        this.shareUserName.next(user.email);
        this.isAuthenticated = true;
      } else {
        this.authStateChange.next(false);
        this.shareUserName.next(null);
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  checkUsername(username) {
    return this.afs.collection(
            'users-profile', ref => ref.where('email', '==', username)
          ).valueChanges();
  }

  createNewUser(username) {
    this.afs.collection('users-profile').add({
      firstName: '',
      lastName: '',
      email: username,
      role: '',
      projects: {},
      contact: {
        address: '',
        city: '',
        country: '',
        phone: ''
      }
    });
 }

 registerUser(userAuthData: UserAuthData) {
   this.afAuth.auth
     .createUserWithEmailAndPassword(userAuthData.email, userAuthData.password)
     .then(result => {
       this.createNewUser(userAuthData.email);
       this.loginUser(userAuthData);
     })
     .catch(err => this.openDialog(err));
 }

 loginUser(userAuthData: UserAuthData) {
   this.afAuth.auth
     .signInWithEmailAndPassword(userAuthData.email, userAuthData.password)
     .then(result => this.router.navigate(['/services']) )
     .catch(err => this.openDialog(err));
 }

 logout() {
   this.afAuth.auth.signOut();
 }

 isAuth() {
  return this.isAuthenticated;
 }

}
