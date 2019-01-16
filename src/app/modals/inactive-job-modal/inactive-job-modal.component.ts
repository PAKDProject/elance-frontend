import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { IJob } from "src/models/job-model";
import { Store, Select } from "@ngxs/store";
import { ApplyForJob, AcceptApplicant } from "src/redux/actions/job.actions";
import { IUser } from "src/models/user-model";
import { UserState } from "src/redux/states/user.state";
import { Observable } from "rxjs";
import { NotificationService } from "src/services/notifications/notification.service";
import { UserService } from "src/services/user-service/user.service";
import { UserProfileModalComponent } from "../user-profile-modal/user-profile-modal.component";

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
  applicantIDs: string[];

  constructor(
    public dialogRef: MatDialogRef<InactiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob,
    private _store: Store,
    private _notification: NotificationService,
    private _userService: UserService,
    public _viewProfileDialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Check if user posted the job
    this.user$.subscribe(u => {
      this.userID = u.id;
      if (u.id === this.data.employerID) {
        this.isEmployer = true;
      }
    });
    this.applicantIDs = this.data.applicants as Array<string>;

    console.log(this.applicantIDs);
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
    if (this.isEmployer && this.data.applicants) {
      this._userService.batchGetUsers(this.data.applicants).subscribe(res => {
        this.applicants = res;
        this.applicantsVisible = true;
      });
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
  selectUser(userId: string) {
    //Redux call here
    this._store.dispatch(new AcceptApplicant(this.data.id, userId)).subscribe((res) => {
      console.log("Applicant was correctly added")
    })
  }

  dismissUser(id: string) {
    //Redux call here
    this.applicants = this.applicants.filter(applicant => applicant.id !== id);
  }

  viewProfile(id: string) {
    this._userService.getUserByID(id).subscribe(user => {
      this._viewProfileDialog.open(UserProfileModalComponent, {
        data: user
      })
    })
  }
}
