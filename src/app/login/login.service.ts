import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserAuthData } from './../helper/models/user.model';
import { AppService } from '../app.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../helper/dialog/dialog.component';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {
  authStateChange = new Subject<boolean>();
  // TODO: check this if the rooter guard needs this
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private appService: AppService,
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
        this.isAuthenticated = true;
        this.authStateChange.next(true);
        this.appService.shareUserName(user.email);
      } else {
        this.authStateChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  checkUsername(username) {
    return this.afs.collection('users-profile', ref => ref.where('email', '==', username)).valueChanges();
  }

  createNewUser(username) {
    this.afs.collection('users-profile').add({
      firstName: '',
      lastName: '',
      email: username,
      role: 'roles vary based on projects',
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
