import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUser } from 'src/models/user-model';
import { Store } from '@ngxs/store';
import { RequestAddContact } from 'src/redux/actions/user.actions';
import { NotificationService } from 'src/services/notifications/notification.service';
import { AddMemberToOrg } from 'src/redux/actions/organisation.actions';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {

  profileCards;
  constructor(
    public dialogRef: MatDialogRef<UserProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private notification: NotificationService) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addContact() {
    this.store.dispatch(new RequestAddContact({
      id: this.data.user.id,
      fName: this.data.user.fName,
      lName: this.data.user.lName,
      avatarUrl: this.data.user.avatarUrl,
      tagline: this.data.user.tagline,
      email: this.data.user.email
    })).subscribe(() => {
      this.notification.showSuccess(`Added ${this.data.user.fName} ${this.data.user.lName} as a contact`, "Contact them now from the messaging tab")
      this.dialogRef.close()
    })
  }

  addMemberToOrg() {
    if (!isNullOrUndefined(this.data.orgId)) {
      this.store.dispatch(new AddMemberToOrg({
        id: this.data.user.id,
        fName: this.data.user.fName,
        lName: this.data.user.lName,
        avatarUrl: this.data.user.avatarUrl,
        tagline: this.data.user.tagline,
        email: this.data.user.email
      }, this.data.orgId)).subscribe(() => {
        this.notification.showSuccess(`Added ${this.data.user.fName} ${this.data.user.lName} as a member to your organization!`);
        this.dialogRef.close()
      })
    }
  }

  ngOnInit() {
    this.profileCards = this.data.user.profileCards
    this.profileCards.forEach(c => {
      switch (c.type) {
        case "bio":
          c.content = this.data.user.summary
          break;
        case "edu":
          c.content = this.data.user.educationItems
          break;
        case "skills":
          c.content = this.data.user.skills
          break;
        case "jobs":
          c.content = this.data.user.jobHistory
          break;
      }
    });
  }

}
