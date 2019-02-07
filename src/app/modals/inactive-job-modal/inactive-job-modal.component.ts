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
import { UserApplyForJob } from "src/redux/actions/user.actions";

@Component({
  selector: "inactive-job-modal",
  templateUrl: "./inactive-job-modal.component.html",
  styleUrls: ["./inactive-job-modal.component.scss"]
})
export class InactiveJobModalComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>;

  user: IUser;
  applicants: Partial<IUser>[];
  applicantIDs: string[];
  applicantsVisible: boolean = false;
  userID: string;
  isEmployer: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<InactiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob,
    private _store: Store,
    private _notification: NotificationService,
    public _viewProfileDialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Check if user posted the job
    this.user$.subscribe(u => {
      this.user = u;
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


    this._store.dispatch(new ApplyForJob(this.data.id, {
      id: this.user.id,
      fName: this.user.fName,
      lName: this.user.lName,
      avatarUrl: this.user.avatarUrl
    })).subscribe(() => {
      this._store.dispatch(new UserApplyForJob({
        id: this.data.id,
        title: this.data.title,
        description: this.data.description,
        payment: this.data.payment,
        datePosted: this.data.datePosted
      }))
      this.dialogRef.close()
    })
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


  selectUser(user: Partial<IUser>) {
    //Redux- Accept a freelancer
    this._store.dispatch(new AcceptApplicant(this.data.id, { id: user.id, fName: user.fName, lName: user.lName, avatarUrl: user.avatarUrl })).subscribe(() => {
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
