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
  applicantIDs: string[];
  applicantsVisible: boolean = false;
  userID: string;
  isEmployer: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<InactiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob,
    private _store: Store,
    private _notification: NotificationService,
    private _userService: UserService,
    public _viewProfileDialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Check if user posted the job
    this.user$.subscribe(u => {
      this.userID = u.id;
      if (u.id === this.data.employerID) {
        this.isEmployer = true;
      }
    });
  }

  //Close modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Apply for the current job
  apply(): void {
    this.user$.subscribe(user => {
      this._store.dispatch(new ApplyForJob(this.data.id, user)).subscribe(() => {
        this.dialogRef.close();
      });
    });
  }

  //If you are employer and there are applicants show the applicants screen
  showApplicants() {
    if (this.isEmployer && this.data.applicants.length > 0) {
      this.applicants = this.data.applicants;
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


  selectUser(user: IUser) {
    //Redux- Accept a freelancer
    this._store.dispatch(new AcceptApplicant(this.data.id, user)).subscribe(() => {
      this._notification.showSuccess(`You chose ${user.fName} to do your job!`, "Let's hope he's competent...if not we accept no liability.")
      this.dialogRef.close();
    })
  }

  //Temporarily filter out the applicants you don't want
  dismissUser(user: IUser) {
    this.data.applicants = this.data.applicants.filter(applicant => applicant !== user);
    this.applicants = this.applicants.filter(applicant => applicant !== user);
  }

  viewProfile(user: IUser) {
    this._viewProfileDialog.open(UserProfileModalComponent, {
      data: user
    });
  }
}
