import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUser } from 'src/models/user-model';
import { Store } from '@ngxs/store';
import { RequestAddContact } from 'src/redux/actions/user.actions';
import { NotificationService } from 'src/services/notifications/notification.service';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {

  profileCards;
  constructor(
    public dialogRef: MatDialogRef<UserProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser, private store: Store, private notification: NotificationService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addContact() {
    this.store.dispatch(new RequestAddContact({
      id: this.data.id,
      fName: this.data.fName,
      lName: this.data.lName,
      avatarUrl: this.data.avatarUrl,
      tagline: this.data.tagline,
      email: this.data.email
    })).subscribe(() => {
      this.notification.showSuccess(`Added ${this.data.fName} ${this.data.lName} as a contact`, "Contact them now from the messaging tab")
      this.dialogRef.close()

    })
  }

  ngOnInit() {
    this.profileCards = this.data.profileCards
    this.profileCards.forEach(c => {
      switch (c.type) {
        case "bio":
          c.content = this.data.summary
          break;
        case "edu":
          c.content = this.data.educationItems
          break;
        case "skills":
          c.content = this.data.skills
          break;
        case "jobs":
          c.content = this.data.jobHistory
          break;
      }
    });
  }

}
