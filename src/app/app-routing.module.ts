import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './admin/register/register.component';
import { CompanyServicesComponent } from './company-services/company-services.component';
import { ManageServicesComponent } from './admin/manage-services/manage-services.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserComponent},
  { path: 'services', component: CompanyServicesComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin/manage-services', component: ManageServicesComponent},
  { path: 'admin/register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }  <-- debugging purposes only */)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
