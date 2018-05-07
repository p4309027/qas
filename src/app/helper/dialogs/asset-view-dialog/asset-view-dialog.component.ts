import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-asset-view-dialog',
  templateUrl: './asset-view-dialog.component.html',
  styleUrls: ['./asset-view-dialog.component.css']
})
export class AssetViewDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AssetViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
