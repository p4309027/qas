import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatDialog } from '@angular/material';
import { AssetViewDialogComponent } from '../helper/dialogs/asset-view-dialog/asset-view-dialog.component';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.css']
})
export class CompanyServicesComponent implements OnInit {
  step = 0;
  services = [];
  spinner = true;

  constructor(
    private appService: AppService,
    private storage: AngularFireStorage,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.appService.getCompanyServices()
      .subscribe(services => {
        services.map( (service: any) => {
          if (service.imgUrl) {
            service.imgUrl = this.storage.ref(service.imgUrl).getDownloadURL();
          }
        });
        this.services = services;
        this.spinner = false;
      });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openAssetViewDialog(fileType, url, extension?) {
    this.dialog.open( AssetViewDialogComponent, {
      id: 'asset-view-dialog',
      data: { fileType: fileType, url: url, fileExtension: extension}
    });
  }

}
