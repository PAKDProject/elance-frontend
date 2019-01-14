import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {

  profileCards;
  constructor(
    public dialogRef: MatDialogRef<UserProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser) { }

  onNoClick(): void {
    this.dialogRef.close();
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
      }
    });
  }

}
