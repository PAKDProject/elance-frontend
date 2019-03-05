import { JobService } from 'src/services/job-service/job.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IJob } from 'src/models/job-model';
import { Store, Select } from '@ngxs/store';
import { RequestRemoveActiveJob, RequestUpdateUser, RequestUpdateUserSuccess } from 'src/redux/actions/user.actions';
import { UserState } from 'src/redux/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user-model';
import { OrgsState } from 'src/redux/states/organisation.state';
import { IOrganisation } from 'src/models/organisation-model';
import { Router } from '@angular/router';
import { OrganisationService } from 'src/services/organisation-service/organisation.service';
import { UserService } from 'src/services/user-service/user.service';

@Component({
  selector: 'app-active-job-modal',
  templateUrl: './active-job-modal.component.html',
  styleUrls: ['./active-job-modal.component.scss']
})
export class ActiveJobModalComponent implements OnInit {


  @Select(UserState.getUser) user$: Observable<IUser>;
  @Select(OrgsState.getOrgs) org$;

  admin: boolean;
  job_type: string;

  constructor(
    public dialogRef: MatDialogRef<ActiveJobModalComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: IJob,
    private router: Router,
    private jobService: JobService,
    private orgService: OrganisationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.admin = this.isAdmin()
    this.jobService.getJobById(this.data.id).subscribe((res) => {
      this.data = res;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  completeJob() {
    this.job_type = 'user';
    this.data.progress = 100;
    this.data.dateCompleted = new Date();
    let requestCount = 0;
    this.jobService.deleteJob(this.data.id).subscribe((res) => {
      requestCount++;
      switch (this.job_type) {
        case 'org':
          this.orgService.getOrganisationByID(this.data.employerID).subscribe((res) => {
            requestCount++;
            alert('getting org ' + requestCount)
            const active = res.activeJobs || [];
            const i = active.findIndex(j => j.id === this.data.id);
            if (i !== -1) active.splice(i, 1);
            this.orgService.updateOrganisation({ activeJobs: active }, res.id).subscribe(() => { requestCount++; alert('updating org, ' + requestCount) });
          })
          break;
        case 'user':
          this.userService.getUserByID(this.data.employerID).subscribe((res) => {
            requestCount++;
            alert('getting user' + requestCount++)
            console.log(res)
            const posted = res.postedJobs || [];
            const i = posted.findIndex(j => j.id === this.data.id);
            if (i !== -1) posted.splice(i, 1);
            this.userService.updateUser({ postedJobs: posted }, this.data.employerID).subscribe((res) => {
              console.log(res.postedJobs); requestCount++; alert('updating user ' + requestCount)

              let user;
              this.user$.subscribe((res) => {
                user = res;
              })
              const active = user.activeJobs || [];
              const history = user.jobHistory || [];
              const i = active.findIndex(j => j.id === this.data.id);
              if (i !== -1) {
                active.splice(i, 1);
                history.push(this.data);
                this.userService.updateUser({ activeJobs: active, jobHistory: history }, user.id).subscribe((res) => {
                  requestCount++;
                  alert('update second user ' + requestCount)
                  this._store.dispatch(new RequestUpdateUserSuccess({ activeJobs: active, jobHistory: history }))
                })
              }
              this.dialogRef.close()
              // this._store.dispatch(new RequestRemoveActiveJob(this.data, this.data.chosenApplicant.id, this.job_type));

            });
          })
          break;
        default:
          console.log('Error deleting Employer job reference');
          break;
      }
    });

  }

  isAdmin() {
    let isAdmin = false;
    this.org$.subscribe((res) => {
      res.forEach(org => {
        if (org.id === this.data.employerID) {
          isAdmin = true
          this.job_type = 'org';
          return isAdmin
        }
      });
    });

    this.user$.subscribe((res) => {
      if (res.id === this.data.employerID) {
        isAdmin = true;
        this.job_type = 'user';
        return isAdmin
      }
    })
    return isAdmin
  }

  contact() {
    this.router.navigate(['/home/messages/' + 'sad34324-d73fsadas-DAB4GSUS-b801-42069LOL'])
  }

}
