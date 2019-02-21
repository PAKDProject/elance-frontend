import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IUser } from 'src/models/user-model';
import { UserService } from 'src/services/user-service/user.service';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { UserProfileModalComponent } from 'src/app/modals/user-profile-modal/user-profile-modal.component';

@Component({
  selector: 'dashboard-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  @Input('MembersIn') members: IUser[];
  @Input('EditingIn') editing: boolean;
  @Input('orgId') orgId: string;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  results: IUser[] = [];

  constructor(
    private _userService: UserService,
    public _viewProfileDialog: MatDialog
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
      this._viewProfileDialog.open(UserProfileModalComponent, {
          data: {
            user: user,
            orgId: this.orgId
          },
      });
  }
}
