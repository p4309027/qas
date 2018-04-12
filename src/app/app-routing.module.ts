import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyServicesComponent } from './company-services/company-services.component';
import { ManageServicesComponent } from './admin/manage-services/manage-services.component';
import { ManageProjectsComponent } from './admin/manage-projects/manage-projects.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { PageNotFoundComponent } from './helper/page-not-found/page-not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { PhasesComponent } from './projects/phases/phases.component';
import { PhaseComponent } from './projects/phases/phase/phase.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserComponent},
  { path: 'services', component: CompanyServicesComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'projects/:id/phases', component: PhasesComponent},
  { path: 'projects/:id/phases/:phase', component: PhaseComponent},
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'manage-services', component: ManageServicesComponent},
      { path: 'manage-projects', component: ManageProjectsComponent},
      { path: 'manage-users', component: ManageUsersComponent}

    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }  <-- debugging purposes only */)],
  exports: [RouterModule],
  // 'Guards' can also be registered in 'app.module'
  // this module holds all router related metada
  // that's why 'Guard' has been placed here
  providers: []
})

export class AppRoutingModule {}
