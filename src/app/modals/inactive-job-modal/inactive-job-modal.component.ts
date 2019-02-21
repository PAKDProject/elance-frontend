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
import { JobService } from "src/services/job-service/job.service";
import { OrgsState } from "src/redux/states/organisation.state";

@Component({
  selector: "inactive-job-modal",
  templateUrl: "./inactive-job-modal.component.html",
  styleUrls: ["./inactive-job-modal.component.scss"]
})
export class InactiveJobModalComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>;

  @Select(OrgsState.getOrgs) orgs$;

  user: IUser;
  applicants: Partial<IUser>[];
  applicantIDs: string[];
  applicantsVisible: boolean = false;
  userID: string;
  isEmployer: boolean = false;
  fullJob: IJob;
  applied = false;

  constructor(
    public dialogRef: MatDialogRef<InactiveJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _store: Store,
    private _notification: NotificationService,
    public _viewProfileDialog: MatDialog,
    private jobService: JobService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.jobService.getJobById(this.data.job.id).subscribe(res => {
      this.fullJob = res;
      if (this.data.type === 'user') {
        this.user$.subscribe(u => {
          this.user = u;
          if (u.id === this.fullJob.employerID) {
            this.isEmployer = true;
          }
        });
        if (this.fullJob.applicants.findIndex(a => a.id === this.user.id) !== -1) {
          this.applied = true;
        }
      }

      if (this.data.type === 'org') {
        this.orgs$.subscribe((res) => {
          res.forEach(org => {
            if (org.id === this.data.job.employerID) {
              this.isEmployer = true;

            }
          });
        })
      }
    })
    // Check if user posted the job


    // console.log(this.data)
  }

  //Close modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Apply for the current job
  apply(): void {
    this._store.dispatch(new ApplyForJob(this.data.job.id, {
      id: this.user.id,
      fName: this.user.fName,
      lName: this.user.lName,
      avatarUrl: this.user.avatarUrl
    })).subscribe(() => {
      this._store.dispatch(new UserApplyForJob({
        id: this.data.job.id,
        title: this.data.job.title,
        employerName: this.data.job.employerName,
        description: this.data.job.description,
        payment: this.data.job.payment,
        dateDue: this.data.job.dateDue
      }))
      this._notification.showSuccess(`Woohoo you applied for ${this.data.job.title}`, "We wish you the best of luck with your application!")
      this.dialogRef.close()
    })
  }

  //If you are employer and there are applicants show the applicants screen
  showApplicants() {

    if (this.isEmployer && this.fullJob.applicants && this.fullJob.applicants.length > 0) {
      this.applicants = this.fullJob.applicants;
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
    this._store.dispatch(new AcceptApplicant(this.data.job.id, {
      id: user.id,
      fName: user.fName,
      lName: user.lName,
      avatarUrl: user.avatarUrl,
      tagline: user.tagline,
      email: user.email
    }, this.data.type)).subscribe(() => {
      this._notification.showSuccess(`You chose ${user.fName} to do your job!`, "Let's hope he's competent...if not we accept no liability.")
      this.dialogRef.close();
    })
  }

  //Temporarily filter out the applicants you don't want
  dismissUser(user: IUser) {
    this.data.job.applicants = this.data.job.applicants.filter(applicant => applicant !== user);
    this.applicants = this.applicants.filter(applicant => applicant !== user);
  }

  viewProfile(user: IUser) {
    this.userService.getUserByID(user.id).subscribe((res) => {
      this._viewProfileDialog.open(UserProfileModalComponent, {
        data: res
      });
    })

  }
}
