import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular material imports Module
import { NgxSpinnerModule } from 'ngx-spinner';

// Angular material imports
import { AngularMaterialModule } from './angular-material.module';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

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
import { TempUserStorageService } from './temp-user-storage.service';
import { RegisteredGuard } from './registered.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Template Shit
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './view/view.component';
import { EducationCardComponent } from './cards/education-card/education-card.component';
import { SkillCardComponent } from './cards/skill-card/skill-card.component';

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
    SkillCardComponent
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
    ReactiveFormsModule
  ],
  providers: [TempUserStorageService, RegisteredGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
