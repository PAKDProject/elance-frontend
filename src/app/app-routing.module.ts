import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { MessagesComponent } from './messages/messages.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeatureTogglingService } from '../services/feature-toggle/feature-toggling.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { StateGuard } from './state.guard';

import { ViewComponent } from './view/view.component';
import { GridComponent } from './browse-jobs/grid/grid.component';
import { ListComponent } from './browse-jobs/list/list.component';
import { SecretComponent } from 'src/assets/secret/secret.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'callback/auth', component: LoginCallbackComponent },
  { path: 'user/create', component: RegisterFormComponent, canActivate: [StateGuard] },
  { path: 'secret', component: SecretComponent },
  {
    path: 'home', component: ViewComponent, canActivate: [StateGuard], children: [
      { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },
      { path: 'user-dashboard', canActivate: [StateGuard], component: UserDashboardComponent },
      { path: 'browse-jobs', canActivate: [StateGuard], component: BrowseJobsComponent },
      { path: 'messages', canActivate: [StateGuard], component: MessagesComponent },
      { path: 'organization-dashboard', canActivate: [StateGuard], component: OrganizationDashboardComponent },
      { path: 'user-profile', canActivate: [StateGuard], component: ProfileMenuComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
