import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { MessagesComponent } from './messages/messages.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

const routes: Routes = [
  { path: "user-dashboard", component: UserDashboardComponent },
  { path: "browse-jobs", component: BrowseJobsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'organization-dashboard', component: OrganizationDashboardComponent },
  { path: 'user-profile', component: ProfileMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
