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

@Component({
  selector: 'organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {
  testInc = [1, 2, 3, 4, 5];

  invitesOpen: boolean = false;
  org: IOrganisation = null;

  isAdmin = true;
  constructor(private _dialog: MatDialog, private store: Store, private _orgService: OrganisationService) { }

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
  ];;
  selectedPage: string = 'active';

  jobs: IJob[];
  userActiveJobs: IJob[]
  user: IUser;
  contacts: IUser[] = [
    {
      id: "sampleId",
      email: 'testEmail',
      fName: "John",
      lName: "Smith",
      tagline: "Software Developer"
    },
    {
      id: "sampleId",
      email: 'testEmail',
      fName: "John",
      lName: "Smith",
      tagline: "Software Developer"
    },
    {
      id: "sampleId",
      email: 'testEmail',
      fName: "John",
      lName: "Smith",
      tagline: "Software Developer"
    },
    {
      id: "sampleId",
      email: 'testEmail',
      fName: "John",
      lName: "Smith",
      tagline: "Software Developer"
    },
    {
      id: "sampleId",
      email: 'testEmail',
      fName: "John",
      lName: "Smith",
      tagline: "Software Developer"
    },
    {
      id: "sampleId",
      email: 'testEmail',
      fName: "John",
      lName: "Smith",
      tagline: "Software Developer"
    }
  ]

  @Select(JobsState.getJobs)
  jobs$: Observable<IJob[]>;

  @Select(UserState.getActiveJobs)
  activeJobs$: Observable<IJob[]>

  @Select(UserState.getUser)
  user$: Observable<IUser>;

  ngOnInit() {
    this.store.dispatch(new RequestJobs());

    this.jobs$.subscribe(jobs => {
      this.jobs = jobs.splice(0, 7)
    })

    this.activeJobs$.subscribe(jobs => {
      this.userActiveJobs = jobs
    })

    this.contacts = this.contacts.concat(this.contacts);

    this.user$.subscribe(user => {
      this.user = user
    })
  }

  setPage(page: string) {
    this.selectedPage = page;
  }

  openCreate() {
    this._dialog.open(CreateOrganisationModalComponent);
  }

  toggleInvites() { this.invitesOpen = !this.invitesOpen }

  openDashboard(o: IOrganisation) {
    this._orgService.getOrganisationByID(o.id).subscribe(res => {
      this.org = res;
    });
  }

  goBack() { this.org = null }

  editing: boolean = false;
  editingTitle: boolean = false;
  editingBio: boolean = false;
  toggleEditing() {
    if (this.editing) {
      this.editingTitle = false
      this.editingBio = false
    }

    this.editing = !this.editing
  }

  startEditingTitle() {
    if (this.editing) { this.editingTitle = true }
  }
  startEditingBio() {
    if (this.editing) { this.editingBio = true }
  }

  acceptInvite(o: Partial<IOrganisation>) {
    this.user.organisations.push(o);
  }

  rejectInvite(o: Partial<IOrganisation>) {
    const index: number = this.user.orgInvitations.findIndex(org => {
      return org.id === o.id;
    });

    if (index != -1) {
      this.user.orgInvitations.splice(index, 1);
    }
  }
}
