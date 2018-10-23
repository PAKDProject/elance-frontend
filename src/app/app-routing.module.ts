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

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'user-dashboard',
    pathMatch: 'full'
  },
  { 
    path: 'user-dashboard',
    canActivate: [FeatureTogglingService],
    component: UserDashboardComponent
  },
  { 
    path: 'browse-jobs',
    canActivate: [FeatureTogglingService],
    component: BrowseJobsComponent
  },
  { 
    path: 'messages',
    canActivate: [FeatureTogglingService],
    component: MessagesComponent
  },
  { 
    path: 'organization-dashboard',
    canActivate: [FeatureTogglingService],
    component: OrganizationDashboardComponent
  },
  { 
    path: 'user-profile',
    canActivate: [FeatureTogglingService],
    component: ProfileMenuComponent
  },
  { 
    path: '**',
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
