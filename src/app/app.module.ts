import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Ngx-Markdown
import { MarkdownModule } from 'ngx-markdown';

//Angular Bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

//Carousels
import { DragScrollModule } from "ngx-drag-scroll";

// Loading Spinner
import { NgxSpinnerModule } from "ngx-spinner";

//Toastr
import { ToastrModule } from "ngx-toastr";

//Ng-Select
import { NgSelectModule } from "@ng-select/ng-select";

// Angular material imports
import { AngularMaterialModule } from "./angular-material.module";

// Routing Module
import { AppRoutingModule } from "./app-routing.module";

// Redux Module
import { AppReduxModule } from "./app-redux.module";

//Navigation
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

//Page Container
import { ViewComponent } from "./view/view.component";

//Cards
import { EducationCardComponent } from "./cards/education-card/education-card.component";
import { SkillCardComponent } from "./cards/skill-card/skill-card.component";
import { InactiveJobCardComponent } from "./cards/inactive-job-card/inactive-job-card.component";
import { ActiveJobCardComponent } from "./cards/active-job-card/active-job-card.component";
import { InactiveJobListCardComponent } from "./cards/inactive-job-list-card/inactive-job-list-card.component";
import { AddCardComponent } from './cards/add-card/add-card.component';
import { ContactsCardComponent } from './cards/contacts-card/contacts-card.component';
import { ContactCardComponent } from './cards/contact-card/contact-card.component';

//Modals
import { EducationModalComponent } from "./modals/education-modal/education-modal.component";
import { SkillsModalComponent } from "./modals/skills-modal/skills-modal.component";
import { InactiveJobModalComponent } from "./modals/inactive-job-modal/inactive-job-modal.component";
import { ActiveJobModalComponent } from "./modals/active-job-modal/active-job-modal.component";
import { UploadImageModalComponent } from "./modals/upload-image-modal/upload-image-modal.component";
import { CreateJobModalComponent } from "./modals/create-job-modal/create-job-modal.component";
import { SkillContainerModalComponent } from './modals/skill-container-modal/skill-container-modal.component';
import { CreateOrganisationModalComponent } from './modals/create-organisation-modal/create-organisation-modal.component';
import { UserProfileModalComponent } from './modals/user-profile-modal/user-profile-modal.component';

// Services, Guards, Directives, Interceptors
import { NotificationService } from "../services/notifications/notification.service";
import { HttpinterceptorService } from "src/services/http-interceptor/httpinterceptor.service";
import { JobService } from "src/services/job-service/job.service";
import { UserService } from "src/services/user-service/user.service";
import { DropZoneDirective } from "./directives/drop-zone.directive";
import { StateGuard } from "./state.guard";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OrganisationService } from "src/services/organisation-service/organisation.service";
import { NgxImageCompressService } from 'ngx-image-compress'

// Page Components
import { AppComponent } from "./app.component";
import { BrowseJobsComponent } from "./browse-jobs/browse-jobs.component";
import { PostJobComponent } from "./post-job/post-job.component";
import { MessagesComponent } from "./messages/messages.component";
import { ProfileMenuComponent } from "./profile-menu/profile-menu.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginCallbackComponent } from "./login-callback/login-callback.component";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { ListComponent } from "./browse-jobs/list/list.component";
import { GridComponent } from "./browse-jobs/grid/grid.component";
import { SecretComponent } from "src/assets/secret/secret.component";
import { AddSkillComponent } from "./add-skill/add-skill.component";
import { AddEducationComponent } from './cards/add-education/add-education.component';
import { ProfileRowComponent } from './cards/profile-row/profile-row.component';
import { CompletedJobComponent } from './cards/completed-job/completed-job.component';
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { OrganizationDashboardComponent } from "./organization-dashboard/organization-dashboard.component";
import { ActiveComponent } from './organization-dashboard/active/active.component';
import { PostedComponent } from './organization-dashboard/posted/posted.component';
import { ContactsComponent } from './organization-dashboard/contacts/contacts.component';
import { MembersComponent } from './organization-dashboard/members/members.component';
import { SocialLinkComponent } from './social-link/social-link.component';
import { DashboardJobCardComponent } from './cards/dashboard-job-card/dashboard-job-card.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    BrowseJobsComponent,
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
    SecretComponent,
    DropZoneDirective,
    UploadImageModalComponent,
    CreateJobModalComponent,
    AddCardComponent,
    AddSkillComponent,
    SkillContainerModalComponent,
    AddEducationComponent,
    ProfileRowComponent,
    UserProfileModalComponent,
    CompletedJobComponent,
    ContactsCardComponent,
    CreateOrganisationModalComponent,
    ContactCardComponent,
    ActiveComponent,
    PostedComponent,
    ContactsComponent,
    MembersComponent,
    SocialLinkComponent,
    DashboardJobCardComponent
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
    AppReduxModule,
    DragScrollModule,
    NgbModule,
    NgSelectModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-right",
      maxOpened: 4,
      preventDuplicates: true,
      closeButton: true,
      easing: "ease-in",
      newestOnTop: true,
      autoDismiss: true,
      easeTime: 300
    }),
    MarkdownModule.forRoot()
  ],
  providers: [
    UserService,
    StateGuard,
    NotificationService,
    JobService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorService,
      multi: true
    },
    OrganisationService,
    NgxImageCompressService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EducationModalComponent,
    SkillsModalComponent,
    InactiveJobModalComponent,
    ActiveJobModalComponent,
    UploadImageModalComponent,
    CreateJobModalComponent,
    SkillContainerModalComponent,
    UserProfileModalComponent,
    CreateOrganisationModalComponent
  ]
})
export class AppModule { }
