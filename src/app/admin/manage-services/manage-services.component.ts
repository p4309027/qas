import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { AppService } from '../../app.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { LoginService } from '../../login/login.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css']
})
export class ManageServicesComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  services = [];
  servicesForm: FormGroup;
  update = false;
  spinner = true;
  spinnerAdmin = false;
  selectedFile: File;
  selectedFileType = '';
  selectedFileName = '';
  alert = false;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  savingData = false;


  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private adminService: AdminService,
    private loginService: LoginService,
    private storage: AngularFireStorage
  ) {
    this.createForms();
  }


  ngOnInit() {
    this.getServices();
  }

  createForms() {
    this.servicesForm = this.fb.group({
      name: '',
      description: '',
      imgUrl: '',
      info: '',
      moreInfo: ''
    });
  }

  getServices() {
    this.appService.getCompanyServices()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.services = data;
        this.spinner = false;
        this.spinnerAdmin = true;
      });
  }

  onUploadImg(event) {
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.selectedFileType = this.selectedFile.type.split('/')[0];
      if (this.selectedFileType === 'image') {
        this.alert = false;
        this.selectedFileName = this.selectedFile.name;
      } else {
        this.alert = true;
        this.selectedFileName = 'It should be an image file';
      }
    } else {
      this.alert = true;
      this.selectedFileType = '';
      this.selectedFileName = 'Please select a file';
    }

  }

  onSave() {
    this.savingData = true;
    const path = `service-assets/${new Date().getTime()}/${this.selectedFileName}`;
    this.storage.upload(path, this.selectedFile )
    .snapshotChanges()
    .subscribe( snap => {
      if (snap.bytesTransferred === snap.totalBytes) {
        snap.task.then( d => {
          if (d.downloadURL) {
            this.servicesForm.get('imgUrl').patchValue(path);
            this.adminService.saveServices(this.servicesForm.value)
              .then( s => {
                this.servicesForm.reset();
                this.selectedFile = null;
                this.selectedFileType = '';
                this.selectedFileName = '';
                this.savingData = false;
              });
          }
        });
      }
    });
  }

  onSelect(service) {
    this.servicesForm.patchValue(service);
    this.update = true;
  }

  onUpdate() {
    // TODO: create service to update the company services
    this.servicesForm.reset();
    this.update = false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
