import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-server-response-dialog',
  templateUrl: './server-response-dialog.component.html',
  styleUrls: ['./server-response-dialog.component.css']
})
export class ServerResponseDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ServerResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
