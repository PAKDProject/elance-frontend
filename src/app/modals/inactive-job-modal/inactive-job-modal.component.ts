import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { IJob } from "src/models/job-model";
import { Store, Select } from "@ngxs/store";
import { ApplyForJob } from "src/redux/actions/job.actions";
import { IUser } from "src/models/user-model";
import { UserState } from "src/redux/states/user.state";
import { Observable } from "rxjs";
import { NotificationService } from "src/services/notifications/notification.service";

@Component({
  selector: "inactive-job-modal",
  templateUrl: "./inactive-job-modal.component.html",
  styleUrls: ["./inactive-job-modal.component.scss"]
})
export class InactiveJobModalComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>;
  applicants: IUser[];
  userID: string;
  isEmployer: boolean = false;
  applicantsVisible: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<InactiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob,
    private _store: Store,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    //Extract applicants from Job object
    //this.applicants = this.data.applicants;
    //Check if user posted the job
    this.user$.subscribe(u => {
      this.userID = u.id;
      if (u.id === this.data.employer) {
        this.isEmployer = true;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  apply(): void {
    this._store
      .dispatch(new ApplyForJob(this.data.id, this.userID))
      .subscribe(res => {
        this.dialogRef.close();
      });
  }

  //If you are employer and there are applicants show the applicants screen
  showApplicants() {
    if (this.isEmployer && this.applicants.length > 0) {
      this.applicantsVisible = true;
    } else {
      this._notification.showError(
        "No applicants found",
        "Unfortunately there are currently no applicants for this job. Please try again later."
      );
    }
  }

  //Return to normal job modal view
  returnToJob() {
    this.applicantsVisible = false;
  }

  //TODO
  selectUser(id: string) {
    //Redux call here
  }

  dismissUser(id: string) {
    //Redux call here
  }
}
