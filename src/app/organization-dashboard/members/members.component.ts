import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { UserService } from 'src/services/user-service/user.service';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { UserProfileModalComponent } from 'src/app/modals/user-profile-modal/user-profile-modal.component';
import { Store } from '@ngxs/store';
import { RequestRefreshOrg } from 'src/redux/actions/organisation.actions';
import { OrganisationService } from 'src/services/organisation-service/organisation.service';

@Component({
  selector: 'dashboard-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Input('MembersIn') members: Partial<IUser>[];
  @Input('EditingIn') editing: boolean;
  @Input('orgId') orgId: string;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  results: IUser[] = [];

  constructor(
    private _userService: UserService,
    public _viewProfileDialog: MatDialog,
    private _store: Store,
    private _orgService: OrganisationService
  ) { }

  ngOnInit() {

  }

  removeMember(m: IUser) {
    console.log(`Removing Member ${m.fName} ${m.lName}`)
    const index: number = this.members.findIndex(member => {
      return member === m;
    });

    if (index != -1) {
      this.members.splice(index, 1);
    }
  }

  showResults(searchTerm: string) {
    this.results = [];
    this._userService.searchUsers(searchTerm).subscribe((data) => {
      data.users.forEach((u: { _source: IUser; }) => {
        this.results.push(u._source);
      });
      this.trigger.openMenu();
    });
  }

  viewProfile(user: IUser) {
    this._userService.getUserByID(user.id).subscribe((res) => {
      this._viewProfileDialog.open(UserProfileModalComponent, {
        data: {
          user: res,
          isOrg: true,
          orgId: this.orgId
        },
      }).afterClosed().subscribe(() => {
        this._store.dispatch(new RequestRefreshOrg());

        this._orgService.getOrganisationByID(this.orgId).subscribe((org) => {
          this.members = org.members
        })
      });
    })

  }
}
