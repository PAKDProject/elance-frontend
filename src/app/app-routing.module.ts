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
import { FeatureTogglingService } from './feature-toggling.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisteredGuard } from './registered.guard';

import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'callback/auth/:jwt', component: LoginCallbackComponent},
  { path: 'user/create', component: RegisterFormComponent },
  { path: '', component: ViewComponent, canActivate: [RegisteredGuard], children: [
    { path: 'user-dashboard', canActivate: [FeatureTogglingService], component: UserDashboardComponent },
    { path: 'browse-jobs',canActivate: [FeatureTogglingService], component: BrowseJobsComponent },
    { path: 'messages', canActivate: [FeatureTogglingService], component: MessagesComponent },
    { path: 'organization-dashboard', canActivate: [FeatureTogglingService], component: OrganizationDashboardComponent },
    { path: 'user-profile', canActivate: [FeatureTogglingService], component: ProfileMenuComponent },
    { path: '**', component: PageNotFoundComponent }
  ]},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
