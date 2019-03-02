import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateOrganisationModalComponent } from '../modals/create-organisation-modal/create-organisation-modal.component';
import { IJob } from 'src/models/job-model';
import { IUser } from 'src/models/user-model';
import { Select, Store } from '@ngxs/store';
import { JobsState } from 'src/redux/states/job.state';
import { Observable } from 'rxjs';
import { UserState } from 'src/redux/states/user.state';
import { RequestJobs } from 'src/redux/actions/job.actions';
import { IOrganisation } from 'src/models/organisation-model';
import { OrganisationService } from 'src/services/organisation-service/organisation.service';
import { UpdateOrganisation, DeleteOrganisation } from 'src/redux/actions/organisation.actions';
import { RequestUpdateUser } from 'src/redux/actions/user.actions';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { UploadImageModalComponent } from '../modals/upload-image-modal/upload-image-modal.component';
import { OrgsState } from 'src/redux/states/organisation.state';

@Component({
  selector: 'organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {
  //#region Variables
  invitesOpen: boolean = false;
  org: Partial<IOrganisation> = null;
  isAdmin: boolean = true;
  menuItems = [
    {
      path: 'active',
      title: 'Active Jobs'
    },
    {
      path: 'posted',
      title: 'Posted Jobs'
    },
    {
      path: 'contacts',
      title: 'Contacts'
    },
    {
      path: 'members',
      title: 'Members'
    }
  ];
  selectedPage: string = 'active';
  jobs: IJob[];
  userActiveJobs: IJob[]
  user: IUser;
  @Select(UserState.getUser)
  user$: Observable<IUser>;

  //#endregion

  constructor(private dialog: MatDialog, private store: Store, private _orgService: OrganisationService) { }

  //Get the user
  ngOnInit() {
    this.user$.subscribe(user => {
      this.user = user
    })
  }

  //#region Org Actions
  //Check if the current user is the orgs admin
  isAdminUser(o: Partial<IOrganisation>): boolean {
    if (o.adminUser && o.adminUser === this.user.id) return true
    return false;
  }

  //Select an organisation to view the dashboard
  openDashboard(o: Partial<IOrganisation>) {
    this._orgService.getOrganisationByID(o.id).subscribe(res => {
      this.org = res;
    });
  }

  //Delete an organisation
  deleteOrg(o: Partial<IOrganisation>) {
    const dialogRef = this.dialog.open(ConfirmModalComponent)

    dialogRef.afterClosed().subscribe(res => {
      if (res) { this.store.dispatch(new DeleteOrganisation(o.id)) }
    })
  }

  //Open modal to create a new org
  openCreate() {
    this.dialog.open(CreateOrganisationModalComponent);
  }

  //Add a new job to the organisation
  addPosted(newJob: IJob) {
    const posted = this.org.jobsPosted || [];
    posted.push(newJob);
    this.org.jobsPosted = posted;
  }

  addActive(activeJob: IJob) {
    const active = this.org.activeJobs || [];
    const posted = this.org.jobsPosted;
    const i = posted.findIndex(j => j.id === activeJob.id);
    if (i !== -1) posted.splice(i, 1);
    active.push(activeJob);
    this.org.activeJobs = active;
    this.org.jobsPosted = posted;
  }

  //#endregion

  //#region Visual 

  //Visual - Set current page on dashboard
  setPage(page: string) {
    this.selectedPage = page;
  }
  //Visual - Show invites section
  toggleInvites() { this.invitesOpen = !this.invitesOpen }
  //Visual - Return to org select view
  goBack() { this.org = null }


  //#endregion

  //#region editing org
  editing: boolean = false;
  editingTitle: boolean = false;
  editingSite: boolean = false;
  editingBio: boolean = false;
  toggleEditing() {
    if (this.editing) {
      this.editingTitle = false
      this.editingSite = false;
      this.editingBio = false
      this.editOrg();
    }

    this.editing = !this.editing
  }

  startEditingTitle() {
    if (this.editing) { this.editingTitle = true }
  }
  startEditingSite() {
    if (this.editing) { this.editingSite = true }
  }
  startEditingBio() {
    if (this.editing) { this.editingBio = true }
  }

  editOrg() {
    this.store.dispatch(new UpdateOrganisation(this.org, this.org.id));
  }
  editLogo() {
    const dialogRef = this.dialog.open(UploadImageModalComponent, {
      data: "logo"
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        console.log(data)
        this.org.logoUrl = data;
      }
    })
  }

  //#endregion

  //#region Invites

  //Accept an invitation to join an organisation
  acceptInvite(o: Partial<IOrganisation>) {
    this.user.organisations.push(o);

    this.store.dispatch(new RequestUpdateUser(
      {
        id: this.user.id,
        orgInvitations: this.user.orgInvitations
      }
    ))
  }
  //Reject an invitation to join an organisation
  rejectInvite(o: Partial<IOrganisation>) {
    const index: number = this.user.orgInvitations.findIndex(org => {
      return org.id === o.id;
    });

    if (index != -1) {
      this.user.orgInvitations.splice(index, 1);
    }
  }

  updateUserInvitations() {
    this.store.dispatch(new RequestUpdateUser(
      {
        id: this.user.id,
        orgInvitations: this.user.orgInvitations
      }
    ))
  }

  //#endregion


}
