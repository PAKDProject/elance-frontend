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
import { IOrganisation } from "src/models/organisation-model";

@Component({
  selector: "inactive-job-modal",
  templateUrl: "./inactive-job-modal.component.html",
  styleUrls: ["./inactive-job-modal.component.scss"]
})
export class InactiveJobModalComponent implements OnInit {
  @Select(UserState.getUser)
  user$: Observable<IUser>
  user: IUser

  @Select(OrgsState.getOrgs)
  orgs$: Observable<IOrganisation[]>

  applicants: Partial<IUser>[];
  applicantIDs: string[];

  applicantsVisible: boolean = false
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
    console.log(this.data)
    this.jobService.getJobById(this.data.job.id).subscribe(res => {
      this.fullJob = res;
      switch (this.data.type) {
        case 'user':
          if (this.data.type === 'user') {
            this.user$.subscribe(u => {
              this.user = u

              //Check if user is the poster of the job
              if (u.id === res.employerID) { this.isEmployer = true }

              //Check if user has applied for this job
              if (res.applicants) {
                if (res.applicants.findIndex(a => a.id === u.id) != -1) { this.applied = true }
              }
            })
          }
          break;
        case 'org':
          if (this.data.type === 'org') {
            this.orgs$.subscribe(x => {
              x.forEach(org => {
                if (org.id === res.employerID) { this.isEmployer = true }
              })
            })
          }
          break;
      }
    })
  }

  //Close modal
  onNoClick(): void {
    this.dialogRef.close();
  }

  //Apply for the current job
  apply(): void {
    this._store.dispatch(new ApplyForJob(this.fullJob.id, this.user))
    this._store.dispatch(new UserApplyForJob(this.fullJob))
    this._notification.showSuccess(`Woohoo you applied for ${this.fullJob.title}`, "We wish you the best of luck with your application!")
    this.dialogRef.close()
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
    this.fullJob.chosenApplicant = user;
    this.fullJob.dateAccepted = new Date();
    //Redux- Accept a freelancer
    this._store.dispatch(new AcceptApplicant(this.fullJob.id, {
      id: user.id,
      fName: user.fName,
      lName: user.lName,
      avatarUrl: user.avatarUrl,
      tagline: user.tagline,
      email: user.email
    }, this.data.type)).subscribe(() => {
      this._notification.showSuccess(`You chose ${user.fName} to do your job!`, "Let's hope he's competent...if not we accept no liability.")
      this.dialogRef.close({
        active: this.fullJob, contact: {
          id: user.id,
          fName: user.fName,
          lName: user.lName,
          avatarUrl: user.avatarUrl,
          tagline: user.tagline,
          email: user.email
        }
      });
    })
  }

  //Temporarily filter out the applicants you don't want
  dismissUser(user: IUser) {
    this.fullJob.applicants = this.fullJob.applicants.filter(applicant => applicant !== user);
    this.applicants = this.applicants.filter(applicant => applicant !== user);
  }

  viewProfile(user: IUser) {
    this.userService.getUserByID(user.id).subscribe((res) => {
      this._viewProfileDialog.open(UserProfileModalComponent, {
        data: {
          user: res,
          isOrg: false
        }
      });
    })

  }
}
