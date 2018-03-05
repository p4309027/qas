import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './helper/navbar/navbar.component';
import { ModalComponent } from './helper/modal/modal.component';
import { RegisterComponent } from './admin/register/register.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { MessagesComponent } from './project/messages/messages.component';
import { VideosComponent } from './project/videos/videos.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AdminService } from './admin/admin.service';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { UserService } from './user/user.service';
import { ContactComponent } from './user/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ModalComponent,
    RegisterComponent,
    ProjectsComponent,
    ProfileComponent,
    ProjectComponent,
    MessagesComponent,
    VideosComponent,
    AdminComponent,
    UserComponent,
    ContactComponent
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
    AngularFireAuthModule
  ],
  providers: [AppService, LoginService, UserService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
