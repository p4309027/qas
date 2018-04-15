import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './helper/navbar/navbar.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AdminService } from './admin/admin.service';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';
import { ContactComponent } from './user/contact/contact.component';
import { CompanyServicesComponent } from './company-services/company-services.component';
import { ManageServicesComponent } from './admin/manage-services/manage-services.component';
import { ManageProjectsComponent } from './admin/manage-projects/manage-projects.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { PageNotFoundComponent } from './helper/page-not-found/page-not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsService } from './projects/projects.service';
import { PhasesComponent } from './projects/phases/phases.component';
import { PhaseComponent } from './projects/phases/phase/phase.component';
import { ConfirmationDialogComponent } from './helper/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ServerResponseDialogComponent } from './helper/dialogs/server-response-dialog/server-response-dialog.component';
import { UserEditDialogComponent } from './helper/dialogs/user-edit-dialog/user-edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    AdminComponent,
    UserComponent,
    ContactComponent,
    CompanyServicesComponent,
    ManageServicesComponent,
    ManageProjectsComponent,
    ManageUsersComponent,
    PageNotFoundComponent,
    ProjectsComponent,
    PhasesComponent,
    PhaseComponent,
    ConfirmationDialogComponent,
    ServerResponseDialogComponent,
    UserEditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AppService,
    LoginService,
    UserService,
    AdminService,
    ProjectsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    ServerResponseDialogComponent,
    UserEditDialogComponent
  ]
})
export class AppModule { }
