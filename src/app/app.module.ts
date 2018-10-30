import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Loading Spinner
import { NgxSpinnerModule } from 'ngx-spinner';

// Angular material imports
import { AngularMaterialModule } from './angular-material.module';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

// Redux Module
import { AppReduxModule } from './app-redux.module'

//Navigation
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

//Page Container
import { ViewComponent } from './view/view.component';

//Cards
import { EducationCardComponent } from './cards/education-card/education-card.component';
import { SkillCardComponent } from './cards/skill-card/skill-card.component';
import { InactiveJobCardComponent } from './cards/inactive-job-card/inactive-job-card.component';
import { ActiveJobCardComponent } from './cards/active-job-card/active-job-card.component';
import { InactiveJobListCardComponent } from './cards/inactive-job-list-card/inactive-job-list-card.component';
import { ActiveJobListCardComponent } from './cards/active-job-list-card/active-job-list-card.component'

//Modals
import { EducationModalComponent } from './modals/education-modal/education-modal.component';
import { SkillsModalComponent } from './modals/skills-modal/skills-modal.component';
import { InactiveJobModalComponent } from './modals/inactive-job-modal/inactive-job-modal.component';
import { ActiveJobModalComponent } from './modals/active-job-modal/active-job-modal.component';

// Page Components
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowseJobsComponent } from './browse-jobs/browse-jobs.component';
import { MenuIconComponent } from './icons/menu-icon/menu-icon.component';
import { PostJobComponent } from './post-job/post-job.component';
import { MessagesComponent } from './messages/messages.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterFormComponent } from './register-form/register-form.component';
import { TempUserStorageService } from '../services/temp-user/temp-user-storage.service';
import { StateGuard } from './state.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './browse-jobs/list/list.component';
import { GridComponent } from './browse-jobs/grid/grid.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    UserDashboardComponent,
    BrowseJobsComponent,
    MenuIconComponent,
    PostJobComponent,
    MessagesComponent,
    OrganizationDashboardComponent,
    ProfileMenuComponent,
    PageNotFoundComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginCallbackComponent,
    RegisterFormComponent,
    ViewComponent,
    EducationCardComponent,
    SkillCardComponent,
    EducationModalComponent,
    SkillsModalComponent,
    InactiveJobCardComponent,
    ActiveJobCardComponent,
    InactiveJobModalComponent,
    ActiveJobModalComponent,
    ListComponent,
    GridComponent,
    InactiveJobListCardComponent,
    ActiveJobListCardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppReduxModule
  ],
  providers: [TempUserStorageService, StateGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    EducationModalComponent,
    SkillsModalComponent,
    InactiveJobModalComponent,
    ActiveJobModalComponent
  ]
})
export class AppModule { }
