import { NgModule } from '@angular/core';
import {
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

const appMaterialModules: any[] = [
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: appMaterialModules,
  exports: appMaterialModules
})

export class AppMaterialModule { }
