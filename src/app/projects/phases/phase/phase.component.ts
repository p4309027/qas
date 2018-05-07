import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ProjectsService } from '../../projects.service';
import { LoginService } from '../../../login/login.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {MatDialog} from '@angular/material';
import { ConfirmationDialogComponent } from '../../../helper/dialogs/confirmation-dialog/confirmation-dialog.component';
import { AssetViewDialogComponent } from '../../../helper/dialogs/asset-view-dialog/asset-view-dialog.component';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit, OnDestroy {
  @ViewChild('msg') messageInput: ElementRef;
  private ngUnsubscribe: Subject<any> = new Subject();
  // Main task
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  // downloadURL: Observable<string>;
  // ***
  id: string;
  phase: string;
  phaseDocs: any;
  userName: string;
  user: any;
  project: any;
  spinner = true;
  progressBar = false;
  phaseClose = false;
  active = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private projectsService: ProjectsService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.shareUserName
      .takeUntil(this.ngUnsubscribe)
      .subscribe(username => {
        if (username) {
          this.userName = username;
          this.projectsService.getUserProfile(username)
            .takeUntil(this.ngUnsubscribe)
            .subscribe ( user => {
              this.user = {...user[0].payload.doc.data()};
              const role = user[0].payload.doc.data().role;
              if (this.active && (role === 'admin' || role === 'project manager')) {
                this.phaseClose = true;
              }
            });
        }
      });

    this.activatedRoute.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe( params => {
        this.id = params['id'];
        this.phase = params['phase'];
        this.projectsService.getPhaseDocs(this.id, this.phase)
          .takeUntil(this.ngUnsubscribe)
          .subscribe( docs => {
            // check each doc inside array list of docs
            // whether it has file in there
            // if yes, get the path of the file
            // and use it to get the file's 'Storage' downloadable link
            docs.map( (doc: any) => {
              if (doc.file) {
                doc.file.downloadURL = this.storage.ref(doc.file.path).getDownloadURL();
              }
            });
            this.phaseDocs = docs;
            this.spinner = false;
          });
        this.projectsService.getProject(this.id)
          .takeUntil(this.ngUnsubscribe)
          .subscribe((project: any) => {
            this.project = project;
            this.project.id = this.id;
            if (project.activePhase !== this.phase) {
              this.active = false;
              this.phaseClose = false;
            }
          });
      });
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  uploadFile(event) {
    this.progressBar = true;
    // The File object
    const file = event.target.files[0];
    // check & store the file type
    const fileType = file.type.split('/')[0];
    const fileExtension = file.type.split('/')[1];
    // The storage path
    const path = `${this.id}/${this.phase}/${new Date().getTime()}/${file.name}`;
    // The main task
    this.task = this.storage.upload(path, file);
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    this.task.snapshotChanges()
      .subscribe( snap => {
        // checking if a file fully transferred
        if (snap.bytesTransferred === snap.totalBytes) {
          // once it is fully transferred
          // take the snap of the upload
          snap.task.then(d => {
            // and confirm if the file has been uploaded
            // and downloadable link has been generated
            // if yes then update firestore with latest upload details
            // including the path of the uploaded file for future use
            if (d.downloadURL) {
              // Update firestore on completion
              this.db.collection('projects').doc(this.id).collection(this.phase).add({
                createdAt: this.timestamp,
                username: this.userName,
                message: `${this.user.firstName} has been uploaded ${file.name}`,
                fullName: `${this.user.firstName} ${this.user.lastName}`,
                role: this.user.role,
                file: {
                  path,
                  name: file.name,
                  fileType: fileType,
                  fileExtension: fileExtension,
                  size: snap.totalBytes
                }
              }).then(() => {
                this.progressBar = false;
              });
            }
          });
        }
      });

    // The file's download URL
    // this.downloadURL = this.task.downloadURL();
  }

  onSend(msg) {
    this.db.collection('projects').doc(this.id).collection(this.phase).add({
      createdAt: this.timestamp,
      username: this.userName,
      message: msg,
      fullName: `${this.user.firstName} ${this.user.lastName}`,
      role: this.user.role
    }).then(() => {
      this.messageInput.nativeElement.value = '';
    });
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '180px',
      data: { projectName: this.project.projectName, phase: this.phase}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onPhaseClose();
      }
    });
  }

  openAssetViewDialog(fileType, url, extension?) {
    this.dialog.open( AssetViewDialogComponent, {
      id: 'asset-view-dialog',
      data: { fileType: fileType, url: url, fileExtension: extension}
    });
  }

  onPhaseClose() {
    this.spinner = true;
    const newPhase = 'phase' + (this.project.currentPhase + 1);
    const newPhaseObject = {
      activePhase: newPhase,
      completedPhases: this.project.completedPhases,
      currentPhase: this.project.currentPhase + 1,
      phases: this.project.phases
    };
    newPhaseObject.completedPhases.push(this.project.activePhase);
    newPhaseObject.phases[newPhase] = newPhase;
    this.db.collection('projects').doc(this.project.id).update(newPhaseObject)
      .then(() => {
        this.active = false;
        this.phaseClose = false;
        this.db.collection('projects').doc(this.id).collection(newPhase).add({
          createdAt: this.timestamp,
          username: this.userName,
          message: `Welcome to ${newPhase}`,
          fullName: `${this.user.firstName} ${this.user.lastName}`,
          role: this.user.role
        }).then(() => {
          this.router.navigate([`/projects/${this.project.id}/phases`]);
        });
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
